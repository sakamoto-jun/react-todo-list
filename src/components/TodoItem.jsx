import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo, updateTodo } from "../store/todoSlice";

function TodoItem({ id, text, completed }) {
  const itemClass = "flex items-center gap-[12px] h-[65px] px-[12px]";
  const inputClass =
    "grow border-[1px] border-solid border-gray-500 rounded-[6px] bg-black px-[12px] py-[4px] text-[14px] leading-tight text-white";
  const iconButtonClass =
    "shrink-0 flex items-center justify-center w-[30px] h-[30px] border-none bg-black text-slate-500  hover:text-white cursor-pointer";

  const [edit, setEdit] = useState(false);
  const [inputText, setInputText] = useState(text);
  const dispatch = useDispatch();

  const handleToggle = () => dispatch(toggleTodo(id));
  const handleEdit = () => setEdit((prev) => !prev);
  const handleChange = (e) => setInputText(e.target.value);
  const handleDelete = () => dispatch(deleteTodo(id));
  const handleSubmit = () => {
    if (inputText.trim() === "") return;
    dispatch(
      updateTodo({
        id,
        text: inputText,
      })
    );
    setEdit(false);
  };

  return (
    <div className={itemClass}>
      <input
        type="checkbox"
        className="w-[16px] h-[16px]"
        checked={completed}
        onChange={handleToggle}
      />
      {edit ? (
        <input
          className={inputClass}
          value={inputText}
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          onBlur={handleSubmit}
        />
      ) : (
        <p
          className={["grow", completed && "line-through text-slate-500"].join(
            " "
          )}
        >
          {text}
        </p>
      )}
      <button className={iconButtonClass} onClick={handleEdit}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </button>
      <button className={iconButtonClass} onClick={handleDelete}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
    </div>
  );
}

export default TodoItem;
