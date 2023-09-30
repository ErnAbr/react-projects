import { TodoItem } from "./TodoItem";
import "./styles.css";

export const TodoList = ({ todos, deleteTodo }) => {
  return (
    <ul className="ul-styles">
      {todos.map((todo, index) => (
        <TodoItem key={index} todo={todo} deleteTodo={deleteTodo} />
      ))}
    </ul>
  );
};
