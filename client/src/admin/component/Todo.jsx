
// import React, { useState, useEffect } from "react";
// import './todo.css';

// function Todo() {
//     return (
//         <>
//             <div className="todo-container  p-4">
//                 <h5 className="mb-3">To-Do List</h5>
//                 <div className="todo-body text-center">
//                     <p>Your to-do list is empty. Once tasks are added, they will appear here.</p>
//                     <button className="btn btn-primary">Add Task</button>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Todo;

import React, { useState } from "react";
import "./todo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faPen,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  // Add a new task
  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    setTodos([...todos, newTask]);
    setNewTask("");
  };

  // Delete a task
  const handleDeleteTask = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  // Start editing
  const handleEditTask = (index) => {
    setEditingIndex(index);
    setEditedTask(todos[index]);
  };

  // Save edited task
  const handleSaveEdit = (index) => {
    if (editedTask.trim() === "") return;
    const updatedTodos = [...todos];
    updatedTodos[index] = editedTask;
    setTodos(updatedTodos);
    setEditingIndex(null);
  };

  return (
    <div className="todo-container p-4">
      <h5 className="mb-3">To-Do List</h5>

      <div className="mb-3 d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        />
        <button className="btn btn-primary d-flex gap-1 align-items-center " style={{fontSize: '13px'}} onClick={handleAddTask}>
          <FontAwesomeIcon icon={faPlus} /> Add
        </button>
      </div>

      <div className="todo-body">
        {todos.length === 0 ? (
          <p className="text-center text-muted">
            Your to-do list is empty. Once tasks are added, they will appear
            here.
          </p>
        ) : (
          <ul className="list-group">
            {todos.map((task, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {editingIndex === index ? (
                  <input
                    type="text"
                    className="form-control me-2"
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveEdit(index)}
                    autoFocus
                  />
                ) : (
                  <span>{task}</span>
                )}

                <div className="d-flex gap-2">
                  {editingIndex === index ? (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleSaveEdit(index)}
                    >
                      <FontAwesomeIcon icon={faCheck} /> Save
                    </button>
                  ) : (
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEditTask(index)}
                    >
                      <FontAwesomeIcon icon={faPen} /> Edit
                    </button>
                  )}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteTask(index)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Todo;
