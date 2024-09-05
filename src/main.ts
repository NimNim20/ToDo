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

const renderTodos = (): void => {
  todoList.innerHTML = ''

  todos.forEach(todo => {
    const li = document.createElement('li')
    li.className = 'todo-item'
    li.innerHTML = `
      <span>${todo.title}</span>
      <button>Remove</button>
      <button id="edit">Edit</button>
      `;
      addRemoveButtonListener(li, todo.id)
      addEditButtonListener(li, todo.title)
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


