import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3001/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Add a new todo
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const response = await axios.post("http://localhost:3001/todos", {
        task: newTodo,
        completed: false,
      });
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Update a todo
  const updateTodo = async (id) => {
    if (!editingText.trim()) return;
    try {
      const response = await axios.put(`http://localhost:3001/todos/${id}`, {
        task: editingText,
      });

      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, task: response.data.task } : todo
        )
      );
      setEditingId(null);
      setEditingText("");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Handle edit
  const handleEdit = (id, task) => {
    setEditingId(id);
    setEditingText(task);
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="App">
      <h1>Todo App</h1>
      {/* Add Todo Form */}
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo..."
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      {/* Todo List */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => updateTodo(todo.id)}>Update</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                {todo.task} {/* Use 'task' to display the todo */}
                <button onClick={() => handleEdit(todo.id, todo.task)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
