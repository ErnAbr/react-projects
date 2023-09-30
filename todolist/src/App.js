import { useState, useEffect } from "react";
import "./App.css";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";

function App() {
  const savedTodos = localStorage.getItem("todos");
  const initialTodos = savedTodos ? JSON.parse(savedTodos) : [];
  const [todos, setTodos] = useState(initialTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo, category) => {
    const newTodo = { todo, category };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const deleteTodo = (todoToDelete) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo !== todoToDelete));
  };
  console.log(todos);
  return (
    <div className="App">
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
