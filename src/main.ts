import './style.css'

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// Step 2: Initialize the todos array
let todos: Todo[] = []

// Step 3: Get referencec to the HTML elements
const todoInput = document.getElementById('todo-input') as HTMLInputElement
const todoList = document.getElementById('todo-list') as HTMLUListElement
const todoForm = document.querySelector('.todo-form') as HTMLFormElement
const clearCompletedButton = document.getElementById('clear-completed-btn') as HTMLButtonElement
const toggleAllButton = document.getElementById('toggle-all-btn') as HTMLButtonElement


// Step 4: Create a function to add a new todo
const addTodo = (text: string): void => {
  const newTodo: Todo = {
    id: Date.now(),
    title: text,
    completed: false
  }
  todos.push(newTodo)
  console.log("Todo added: ", todos)
  renderTodos() // Refreshes the todo list when something gets added
}

const toggleTodo = (id: number): void => {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  )
  renderTodos()
}

const renderTodos = (): void => {
  todoList.innerHTML = ''

  

  todos.forEach(todo => {
    const li = document.createElement('li')
    li.className = 'todo-item'

    if (todo.completed) {
      li.classList.add('completed')
    }

    li.innerHTML = `
      <input type="checkbox" ${todo.completed ? 'checked' : ''}>
      <span>${todo.title}</span>
      <button id="remove">Remove</button>
      <button id="edit">Edit</button>
      <button id="toggle-button">Complete</button>
      `;

      addRemoveButtonListener(li, todo.id)
      addEditButtonListener(li, todo.title)
      addToggleListener(li, todo.id)
      todoList.appendChild(li)
  })
}

renderTodos();

// Step 5: Create a function to remove a todo
todoForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const text = todoInput.value.trim()
  if (text !== '') {
    addTodo(text);
    todoInput.value = ''
  }
})

const addRemoveButtonListener = (li: HTMLLIElement, id: number) => {
  const removeButton = li.querySelector('button')
  removeButton?.addEventListener('click', () => removeTodo(id))
}

const removeTodo = (id: number) => {
  todos = todos.filter(todo => todo.id !== id)
  renderTodos()
}

// Step 6: Create an edit todo function
// Step 6.1: Get the todo item by id
// Step 6.2: Update the todo item
// Step 6.3: Refresh the todo list
// Step 6.4: Add an event listener to the todo item

const addEditButtonListener = (li: HTMLLIElement, id: string) => {
  const editButton = li.querySelector('#edit')
  editButton?.addEventListener('click', () => editTodo(id))
}

const editTodo = (title: string) => {
  const todo = todos.find(todo => todo.title === title)
  if (todo) {                   // If the todo exists then prompt the user to edit the todo
    const text = prompt('Edit todo', todo.title)
    if (text) {
      todo.title = text
      renderTodos()
    }
  }
}

// Step 7: Create a function to change background color
const changeColor = (): void => {
  const colorPicker = document.getElementById('colorPicker') as HTMLInputElement
  if (colorPicker) {
    colorPicker.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement
      changeBackgroundColor(target.value)
    })
  }
  else {
    console.error('Color input not found')
  }
}

const changeBackgroundColor = (color: string): void => {
  document.body.style.backgroundColor = color
}

document.addEventListener('DOMContentLoaded', () => {
  changeColor()
})


// Step 8: Create a function to toggle the completed status of a todo item
const toggleAllTodos = (): void => {
  const allCompleted = todos.every(todo => todo.completed) // Check if all are completed

  todos = todos.map(todo => ({
    ...todo,
    completed: !allCompleted // Toggle all to the opposite state
  }))

  renderTodos() // Re-render the todo list
}

const addToggleListener = (li: HTMLLIElement, id: number) => {
  const checkbox = li.querySelector('input[type="checkbox"]') as HTMLInputElement
  checkbox?.addEventListener('change', () => toggleTodo(id))

  const toggleButton = li.querySelector('#toggle-button')
  toggleButton?.addEventListener('click', () => toggleTodo(id))
}
toggleAllButton.addEventListener('click', toggleAllTodos)

// const removeTodo = (id: number) => {
//   todos = todos.filter(todo => todo.id !== id)
//   renderTodos()
// }

const clearCompletedTodos = (): void => {
  todos = todos.filter(todo => !todo.completed)
  renderTodos()
}

clearCompletedButton.addEventListener('click', clearCompletedTodos)





//Optional features list: 

// Option 1: Add a button to toggle the completed status of a todo item
// Function to toggle the completed status of a todo + 
// Add a button to toggle the completed status of a todo item

// Option 2: Add a button to clear all completed todos
// Add a button to clear all completed todos
// Function to clear all completed todos
// Add a button to toggle all todos

// Option 3: Add a button to toggle all todos
// Edit a todo item and update it
// Add an input field to edit a todo item
// Save the updated todo item
// Cancel the editing of a todo item
// Add a button to cancel the editing of a todo item

// Option 4: Add a button to filter todos by status
// Add a button to filter todos by status
// Function to filter todos by status

// Option 5: Add a button to sort todos by status
// Add a button to sort todos by status
// Function to sort todos by status

// Option 6: Due Date for Todos:
// Add a date input field to set a due date for each todo item.
// Display the due date next to each todo item.
// Highlight overdue todos.
// Priority Levels:

// Option 7: Add a dropdown to set the priority level (e.g., Low, Medium, High) for each todo item.
// Display the priority level next to each todo item.
// Sort todos by priority.
// Search Functionality:

// Option 8: Add a search input field to filter todos based on the search query.
// Display only the todos that match the search query.
// Category Tags:

// Option 9: Add a text input field to assign category tags to each todo item.
// Display the tags next to each todo item.
// Filter todos by category tags.
// Progress Indicator:

// Option 10: Add a progress bar to show the percentage of completed todos.
// Update the progress bar as todos are marked as completed or incomplete.
// Dark Mode Toggle:

// Option 11: Add a button to toggle between light and dark modes.
// Change the app's theme based on the selected mode.
// Export/Import Todos:

// Option 12: Add buttons to export the list of todos to a JSON file.
// Add functionality to import todos from a JSON file.
// Notifications:

// Option 13: Add notifications to remind users of due todos.
// Use the Notification API to show browser notifications.

// Option 14: Local Storage:
// Save the list of todos to local storage.
// Retrieve the todos from local storage on page load.
// Add a button to clear all todos from local storage.

// Option 15: JSDOC Comments:
// Add JSDoc comments to document the functions and interfaces in the code.
// Link : https://jsdoc.app/

// Optional 16: Handle Errors:
// Add error handling for user input validation. Show red text or border for invalid input.
// Display error messages for invalid input.