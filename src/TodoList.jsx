import React, { useState } from 'react';
import { useTodos } from './TodoContext';

const TodoList = () => {
  const { tasks, addTask, deleteTask, updateTask, error } = useTodos();
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [editTask, setEditTask] = useState('');

  const handleAddTask = () => {
    addTask(newTask);
    setNewTask('');
  };

  const handleEditClick = (task) => {
    setIsEditing(task.id);
    setEditTask(task.todo);
  };

  const handleUpdateTask = (id) => {
    updateTask(id, editTask);
    setIsEditing(null); // Exit edit mode
  };

  return (
    <div style={{ width: '80%', margin: '0 auto', textAlign: 'left' }}>
      <h1>Todo List</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <input
        type="text"
        placeholder="Add new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <button 
        onClick={handleAddTask}
        style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
      >
        Add Task
      </button>
      
      <ul style={{ paddingLeft: '0', listStyleType: 'none', width: '100%' }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: '1px solid #ddd', paddingBottom: '5px', width: '100%' }}>
            {isEditing === task.id ? (
              <>
                <input
                  type="text"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                  style={{ flexGrow: 1, marginRight: '10px' }}
                />
                <button 
                  style={{ background: '#4CAF50', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                  onClick={() => handleUpdateTask(task.id)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span style={{ wordBreak: 'break-word', flexGrow: 1 }}>{task.todo}</span>
                <div style={{ display: 'flex', gap: '10px' }}> {/* Container for buttons */}
                  <button 
                    style={{ background: '#4CAF50', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                    onClick={() => handleEditClick(task)}
                  >
                    Edit
                  </button>
                  <button 
                    style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
