import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  list: [],
  filterType: "ALL",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo(state, action) {
      state.list.push({
        id: action.payload.id,
        text: action.payload.text,
        completed: false,
      });
    },
    updateTodo(state, action) {
      state.list = state.list.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, text: action.payload.text };
        } else {
          return item;
        }
      });
    },
    deleteTodo(state, action) {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    toggleTodo(state, action) {
      state.list = state.list.map((item) => {
        if (item.id === action.payload) {
          return { ...item, completed: !item.completed };
        } else {
          return item;
        }
      });
    },
    toggleTodoAll(state, action) {
      state.list = state.list.map((item) => ({
        ...item,
        completed: action.payload,
      }));
    },
    deleteTodoCompleted(state) {
      state.list = state.list.filter((item) => !item.completed);
    },
    setFilter(state, action) {
      state.filterType = action.payload;
    },
  },
});

export const {
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  toggleTodoAll,
  deleteTodoCompleted,
  setFilter,
} = todoSlice.actions;

export default todoSlice.reducer;
