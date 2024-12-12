import React, { useState } from "react";

function TodoList({ todos, deleteTodo, updateTodo }) {
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleEdit = (id, title) => {
    setEditingId(id);
    setEditingText(title);
  };

  const handleUpdate = (id) => {
    updateTodo(id, { title: editingText });
    setEditingId(null);
    setEditingText("");
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {editingId === todo.id ? (
            <>
              <input
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
              <button onClick={() => handleUpdate(todo.id)}>Update</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              {todo.title}
              <button onClick={() => handleEdit(todo.id, todo.title)}>
                Edit
              </button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
