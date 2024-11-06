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
  const todo = todos.find(todo => todo.id === id)
  if (todo) {
    todo.completed = !todo.completed
    renderTodos()
    updateProgressBar()
  }
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


// Option 3: Add a button to toggle all todos
// Edit a todo item and update it
// Add an input field to edit a todo item
// Save the updated todo item
// Cancel the editing of a todo item
// Add a button to cancel the editing of a todo item

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


// Option 1: Add a button to toggle the completed status of a todo item
// Function to toggle the completed status of a todo + 
// Add a button to toggle the completed status of a todo item

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


// Option 2: Add a button to clear all completed todos
// Add a button to clear all completed todos
// Function to clear all completed todos
// Add a button to toggle all todos

const clearCompletedTodos = (): void => {
  todos = todos.filter(todo => !todo.completed)
  renderTodos()
}

clearCompletedButton.addEventListener('click', clearCompletedTodos)


// Option 10: Add a progress bar to show the percentage of completed todos.
// Update the progress bar as todos are marked as completed or incomplete.
const updateProgressBar = (): void => {
  const totalTodos = todos.length
  const completedTodos = todos.filter(todo => todo.completed).length
  const progress = totalTodos === 0 ? 0 : (completedTodos / totalTodos) * 100
  const progressBar = document.querySelector('#todo-progress-bar') as HTMLProgressElement
  const progressText = document.querySelector('#progress-text') as HTMLSpanElement
  progressBar.value = progress
  progressText.textContent = `${Math.round(progress)}%`
}


// Option 11: Add a button to toggle between light and dark modes.
// Change the app's theme based on the selected mode.

