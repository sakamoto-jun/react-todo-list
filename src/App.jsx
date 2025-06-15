import { useEffect } from "react";
import { useSelector } from "react-redux";
import Controls from "./components/Controls";
import Layout from "./components/Layout";
import Title from "./components/Title";
import TodoList from "./components/TodoList";

function App() {
  const state = useSelector((state) => state.todo);

  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(state.list));
  }, [state.list]);

  return (
    <Layout>
      <Title />
      <Controls />
      <TodoList />
    </Layout>
  );
}

export default App;
