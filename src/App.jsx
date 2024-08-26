import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoList from './TodoList'
import { TodoProvider } from './TodoContext'
function App() {

  return (
    <TodoProvider>
      <TodoList/>
    </TodoProvider>
  )
}
export default App
