
import React, { useState, useEffect } from "react";
import './todo.css';

function Todo() {
    return (
        <>
            <div className="todo-container  p-4">
                <h5 className="mb-3">To-Do List</h5>
                <div className="todo-body text-center">
                    <p>Your to-do list is empty. Once tasks are added, they will appear here.</p>
                    <button className="btn btn-primary">Add Task</button>
                </div>
            </div>
        </>
    )
}

export default Todo;