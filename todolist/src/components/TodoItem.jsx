import { useState } from "react";
import "./styles.css";

export const TodoItem = ({ todo, deleteTodo }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCompleted = () => {
    setIsCompleted(true);
  };

  return (
    <div className="">
      <li className={`listItem ${isCompleted ? "completed" : ""}`}>
        ToDo: {todo.todo} / Category: {todo.category}
      </li>
      <button onClick={handleCompleted}>COMPLETED</button>
      <button onClick={() => deleteTodo(todo)}>DELETE</button>
    </div>
  );
};
