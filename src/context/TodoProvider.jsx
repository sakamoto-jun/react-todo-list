import { useEffect, useReducer, useRef } from "react";
import { reducer } from "../reducer";
import TodoContext from "./TodoContext";

const initialState = {
  list: [],
  filterType: "ALL",
};
const init = (initialState) => {
  const savedTodoList = JSON.parse(localStorage.getItem("TODOS")) || [];

  return {
    ...initialState,
    list: savedTodoList,
  };
};

const TodoProvider = ({ children }) => {
  const idRef = useRef(Number(localStorage.getItem("ID")) || 0);
  const [state, dispatch] = useReducer(reducer, initialState, init);

  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(state.list));
    localStorage.setItem("ID", JSON.stringify(idRef.current));
  }, [state.list]);

  return (
    <TodoContext.Provider value={{ state, dispatch, idRef }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
