import { useEffect, useReducer, useRef } from "react";
import Controls from "./components/Controls";
import Layout from "./components/Layout";
import Title from "./components/Title";
import TodoList from "./components/TodoList";
import {
  ADD_TODO,
  DELETE_TODO,
  DELETE_TODO_COMPLETED,
  reducer,
  SET_FILTER,
  TOGGLE_TODO,
  TOGGLE_TODO_ALL,
  UPDATE_TODO,
} from "./reducer";

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

function App() {
  const idRef = useRef(Number(localStorage.getItem("ID")) || 0);
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const { list, filterType } = state;

  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(list));
    localStorage.setItem("ID", JSON.stringify(idRef.current));
  }, [list]);

  const handleChangeFilterType = (type) => {
    dispatch({ type: SET_FILTER, payload: type });
  };
  const handleSubmit = (value) => {
    if (value.trim() === "") return;
    dispatch({
      type: ADD_TODO,
      payload: {
        id: (idRef.current += 1),
        text: value,
      },
    });
  };
  const handleToggle = (id) => {
    dispatch({ type: TOGGLE_TODO, payload: id });
  };
  const handleToggleAll = (flag) => {
    dispatch({ type: TOGGLE_TODO_ALL, payload: flag });
  };
  const handleDelete = (id) => {
    dispatch({ type: DELETE_TODO, payload: id });
  };
  const handleDeleteCompleted = () => {
    dispatch({ type: DELETE_TODO_COMPLETED });
  };
  const handleUpdate = (id, text) => {
    dispatch({
      type: UPDATE_TODO,
      payload: {
        id,
        text,
      },
    });
  };

  const filteredList = list.filter((item) => {
    switch (filterType) {
      case "TODO":
        return !item.completed;
      case "COMPLETED":
        return item.completed;
      default:
        return item;
    }
  });

  return (
    <div>
      <Layout>
        <Title />
        <Controls
          filterType={filterType}
          onChangeFilterType={handleChangeFilterType}
          onSubmit={handleSubmit}
        />
        <TodoList
          data={filteredList}
          onToggle={handleToggle}
          onToggleAll={handleToggleAll}
          onDelete={handleDelete}
          onDeleteCompleted={handleDeleteCompleted}
          onUpdate={handleUpdate}
        />
      </Layout>
    </div>
  );
}

export default App;
