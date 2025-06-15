import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, setFilter } from "../store/todoSlice";

function Controls() {
  const inputClass =
    "grow border-[1px] border-solid border-gray-500 rounded-[6px] bg-black px-[12px] py-[4px] text-[14px] leading-tight text-white";
  const sharedUiClass =
    "shrink-0 border-[1px] border-solid border-gray-500 rounded-[6px] bg-black px-[12px] py-[0px] text-white cursor-pointer";

  const idRef = useRef(Number(localStorage.getItem("ID")) || 0);
  const [text, setText] = useState("");
  const state = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("ID", idRef.current);
  }, [state.list]);

  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = () => {
    if (text.trim() === "") return;
    dispatch(
      addTodo({
        id: (idRef.current += 1),
        text,
      })
    );
    setText("");
  };
  const handleChangeFilterType = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className="flex gap-[6px] h-[30px]">
      <input
        type="text"
        className={inputClass}
        placeholder="할 일을 입력하세요."
        value={text}
        onChange={handleChange}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
      <button className={sharedUiClass} onClick={handleSubmit}>
        추가
      </button>
      <select
        className={sharedUiClass}
        value={state.filterType}
        onChange={handleChangeFilterType}
      >
        <option value="ALL">전체</option>
        <option value="TODO">할 일</option>
        <option value="COMPLETED">완료</option>
      </select>
    </div>
  );
}

export default Controls;
