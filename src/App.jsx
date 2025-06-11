import { useRef, useState } from "react";
import Controls from "./components/Controls";
import Layout from "./components/Layout";
import Title from "./components/Title";
import TodoList from "./components/TodoList";

function App() {
  const [list, setList] = useState([]);
  const [filterType, setFilterType] = useState("ALL");
  const idRef = useRef(0);

  const handleChangeFilterType = (type) => {
    setFilterType(type);
  };
  const handleSubmit = (value) => {
    if (value.trim() === "") return;

    setList((prevList) =>
      prevList.concat({
        id: (idRef.current += 1),
        text: value,
        completed: false,
      })
    );
  };
  const handleToggle = (id) => {
    setList((prevList) =>
      prevList.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        } else {
          return item;
        }
      })
    );
  };
  const handleToggleAll = (flag) => {
    setList((prevList) =>
      prevList.map((item) => {
        return { ...item, completed: flag };
      })
    );
  };
  const handleDelete = (id) => {
    setList((prevList) => prevList.filter((item) => item.id !== id));
  };
  const handleDeleteCompleted = () => {
    setList((prevList) => prevList.filter((item) => !item.completed));
  };
  const handleUpdate = (id, text) => {
    setList((prevList) =>
      prevList.map((item) => {
        if (item.id === id) {
          return { ...item, text };
        } else {
          return item;
        }
      })
    );
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
