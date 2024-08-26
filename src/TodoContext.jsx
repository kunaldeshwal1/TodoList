import React, { createContext, useState, useContext, useEffect } from 'react';

// Create Context
const TodoContext = createContext();

// Create a Provider Component
export const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://dummyjson.com/todos');
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setTasks(data.todos);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTodos();
  }, []);

  const addTask = (newTask) => {
    if (newTask.trim() !== '') {
      const newTaskObj = { id: tasks.length + 1, todo: newTask };
      setTasks([...tasks, newTaskObj]);
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, todo: updatedTask } : task));
  };

  return (
    <TodoContext.Provider value={{ tasks, addTask, deleteTask, updateTask, error }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }

  return context;
};
