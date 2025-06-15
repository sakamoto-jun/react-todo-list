import { configureStore } from "@reduxjs/toolkit";
import todoReducer, { initialState } from "./todoSlice";

const init = (initialState) => {
  const savedTodoList = JSON.parse(localStorage.getItem("TODOS")) || [];

  return {
    ...initialState,
    list: savedTodoList,
  };
};

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
  preloadedState: {
    todo: init(initialState),
  },
});
