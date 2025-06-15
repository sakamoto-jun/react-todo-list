import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Controls from "./components/Controls";
import Layout from "./components/Layout";
import Title from "./components/Title";
import TodoList from "./components/TodoList";
import { fetchTodos } from "./store/todoSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchTodos());
    };
    fetchData();
  }, [dispatch]);

  return (
    <Layout>
      <Title />
      <Controls />
      <TodoList />
    </Layout>
  );
}

export default App;
