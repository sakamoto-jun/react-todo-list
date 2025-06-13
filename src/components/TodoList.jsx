import { useContext } from "react";
import TodoContext from "../context/TodoContext";
import { DELETE_TODO_COMPLETED, TOGGLE_TODO_ALL } from "../reducer";
import TodoItem from "./TodoItem";
import "./TodoList.css";

function TodoList() {
  const { state, dispatch } = useContext(TodoContext);

  const filteredList = state.list.filter((item) => {
    switch (state.filterType) {
      case "TODO":
        return !item.completed;
      case "COMPLETED":
        return item.completed;
      default:
        return item;
    }
  });
  const isAllCompleted =
    filteredList.length > 0 && filteredList.every((item) => item.completed);
  const completedCount = filteredList.filter((item) => item.completed).length;

  const handleToggleAll = (e) => {
    dispatch({ type: TOGGLE_TODO_ALL, payload: e.target.checked });
  };
  const handleDeleteCompleted = () => {
    dispatch({ type: DELETE_TODO_COMPLETED });
  };

  return (
    <div className="todo-list">
      <div className="todo-header">
        <input
          type="checkbox"
          className="todo-header-checkbox"
          checked={isAllCompleted}
          onChange={handleToggleAll}
        />
        <p className="todo-header-text">To Do</p>
        {completedCount > 0 && (
          <button
            className="todo-header-button"
            onClick={handleDeleteCompleted}
          >
            {completedCount}개 선택 삭제
          </button>
        )}
      </div>
      {filteredList.map((item) => (
        <TodoItem key={item.id} {...item} />
      ))}
    </div>
  );
}

export default TodoList;
