import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Todos({ userId }) {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const saved = localStorage.getItem(`todos-${userId}`);
    if (saved) {
      setTodos(JSON.parse(saved));
    } else {
      axios
        .get(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
        .then((res) => setTodos(res.data));
    }
  }, [userId]);

  useEffect(() => {
    localStorage.setItem(`todos-${userId}`, JSON.stringify(todos));
  }, [todos, userId]);

  const toggle = (id) =>
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

  const filtered = todos.filter((t) => {
    if (filter === "all") return true;
    if (filter === "completed") return t.completed;
    if (filter === "incomplete") return !t.completed;
    return true;
  });

  const completed = todos.filter((t) => t.completed).length;

  return (
    <div>
      <p>
        ✔ {completed} of {todos.length} completed
      </p>
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("incomplete")}>Incomplete</button>
      </div>
      {filtered.map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggle(todo.id)}
          />
          {todo.title}
        </div>
      ))}
    </div>
  );
}
