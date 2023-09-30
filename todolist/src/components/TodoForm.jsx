import { useState } from "react";
import "./styles.css";

export const TodoForm = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue, selectedCategory);
      setInputValue("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          value={inputValue}
          placeholder="Add a new to-do"
        />
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          <option value="HouseWork">HouseWork</option>
          <option value="Study">Study</option>
          <option value="Business">Business</option>
          <option value="Exercise">Exercise</option>
        </select>
        <button type="submit">ADD TODO</button>
      </form>
    </div>
  );
};
