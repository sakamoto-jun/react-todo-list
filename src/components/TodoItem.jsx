import { useState } from "react";
import "./TodoItem.css";

function TodoItem({ id, text, completed, onToggle, onDelete, onUpdate }) {
  const [edit, setEdit] = useState(false);

  const handleEdit = () => setEdit((prev) => !prev);
  const handleChange = (e) => onUpdate(id, e.target.value);

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        className="todo-item-checkbox"
        checked={completed}
        onChange={onToggle}
      />
      {edit ? (
        <input
          className="todo-edit-input"
          value={text}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setEdit(false);
            }
          }}
          onBlur={() => setEdit(false)}
        />
      ) : (
        <p className={["todo-item-text", completed && "completed"].join(" ")}>
          {text}
        </p>
      )}
      <button className="todo-item-button" onClick={handleEdit}>
        수정
      </button>
      <button className="todo-item-button" onClick={onDelete}>
        삭제
      </button>
    </div>
  );
}

export default TodoItem;
