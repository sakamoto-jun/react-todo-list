import { useContext, useState } from "react";
import TodoContext from "../context/TodoContext";
import { DELETE_TODO, TOGGLE_TODO, UPDATE_TODO } from "../reducer";
import "./TodoItem.css";

function TodoItem({ id, text, completed }) {
  const [edit, setEdit] = useState(false);
  const [inputText, setInputText] = useState(text);
  const { dispatch } = useContext(TodoContext);

  const handleToggle = () => {
    dispatch({ type: TOGGLE_TODO, payload: id });
  };
  const handleEdit = () => setEdit((prev) => !prev);
  const handleChange = (e) => setInputText(e.target.value);
  const handleSubmit = () => {
    if (inputText.trim() === "") return;
    dispatch({
      type: UPDATE_TODO,
      payload: {
        id,
        text: inputText,
      },
    });
    setEdit(false);
  };
  const handleDelete = () => {
    dispatch({ type: DELETE_TODO, payload: id });
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        className="todo-item-checkbox"
        checked={completed}
        onChange={handleToggle}
      />
      {edit ? (
        <input
          className="todo-edit-input"
          value={inputText}
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          onBlur={handleSubmit}
        />
      ) : (
        <p className={["todo-item-text", completed && "completed"].join(" ")}>
          {text}
        </p>
      )}
      <button className="todo-item-button" onClick={handleEdit}>
        수정
      </button>
      <button className="todo-item-button" onClick={handleDelete}>
        삭제
      </button>
    </div>
  );
}

export default TodoItem;
