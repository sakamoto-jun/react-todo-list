import { useContext, useState } from "react";
import TodoContext from "../context/TodoContext";
import { ADD_TODO, SET_FILTER } from "../reducer";
import "./Controls.css";

function Controls() {
  const [text, setText] = useState("");
  const { state, dispatch, idRef } = useContext(TodoContext);

  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = () => {
    if (text.trim() === "") return;
    dispatch({
      type: ADD_TODO,
      payload: {
        id: (idRef.current += 1),
        text: text,
      },
    });
    setText("");
  };
  const handleChangeFilterType = (e) => {
    dispatch({ type: SET_FILTER, payload: e.target.value });
  };

  return (
    <div className="controls">
      <input
        type="text"
        className="input"
        placeholder="할 일을 입력하세요."
        value={text}
        onChange={handleChange}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
      <button className="button" onClick={handleSubmit}>
        추가
      </button>
      <select
        className="select"
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
