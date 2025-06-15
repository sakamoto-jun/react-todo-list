import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

export const initialState = {
  list: [],
  filterType: "ALL",
};

// Utility
const updateItemInList = (list, updatedItem) => {
  return list.map((item) => (item.id === updatedItem.id ? updatedItem : item));
};

// AsyncThunk
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await api.get("/todos");

  return res.data;
});
export const createTodo = createAsyncThunk("todos/createTodo", async (text) => {
  const res = await api.post("/todos", {
    id: String(Date.now()),
    text,
    completed: false,
  });

  return res.data;
});
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, text }) => {
    const res = await api.patch(`/todos/${id}`, { text });

    return res.data;
  }
);
export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await api.delete(`todos/${id}`);

  return id;
});
export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  async ({ id, completed }) => {
    const res = await api.patch(`todos/${id}`, { completed });

    return res.data;
  }
);
export const deleteTodoCompleted = createAsyncThunk(
  "todos/deleteTodoCompleted",
  async (_, { getState }) => {
    const state = getState();
    const completedIds = state.todo.list
      .filter((item) => item.completed)
      .map((item) => item.id);

    await Promise.all(completedIds.map((id) => api.delete(`todos/${id}`)));

    return completedIds;
  }
);

// Slice
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    toggleTodoAll(state, action) {
      state.list = state.list.map((item) => ({
        ...item,
        completed: action.payload,
      }));
    },
    setFilter(state, action) {
      state.filterType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.list = updateItemInList(state.list, action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item.id !== action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        state.list = updateItemInList(state.list, action.payload);
      })
      .addCase(deleteTodoCompleted.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (item) => !action.payload.includes(item.id)
        );
      });
  },
});

export const { toggleTodoAll, setFilter } = todoSlice.actions;

export default todoSlice.reducer;
