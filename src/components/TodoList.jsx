import { useContext } from "react";
import TodoContext from "../context/TodoContext";
import { DELETE_TODO_COMPLETED, TOGGLE_TODO_ALL } from "../reducer";
import TodoItem from "./TodoItem";

function TodoList() {
  const listClass =
    "p-[5px] mt-[16px] border border-solid border-gray-500 rounded-[6px]";
  const headerClass = "flex items-center gap-[12px] h-[40px] px-[12px]";
  const buttonClass =
    "shrink-0 border border-solid border-gray-500 hover:border-red-500 rounded-[6px] bg-black px-[12px] text-white hover:text-red-500 cursor-pointer";

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
    <div className={listClass}>
      <div className={headerClass}>
        <input
          type="checkbox"
          className="w-[16px] h-[16px]"
          checked={isAllCompleted}
          onChange={handleToggleAll}
        />
        <p className="grow">To Do</p>
        {completedCount > 0 && (
          <button className={buttonClass} onClick={handleDeleteCompleted}>
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
