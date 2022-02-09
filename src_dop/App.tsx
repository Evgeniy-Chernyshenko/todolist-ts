import React, { useState } from "react";
import { v1 } from "uuid";
import "./App.css";
import { TaskType, TodoList } from "./TodoList";

export type FilterValueType = "all" | "active" | "completed";

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: "HTML&CSS", isDone: false },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
  ]);
  const [filterValue, setFilterValue] = useState<FilterValueType>("all");

  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const addTask = (title: string) => {
    setTasks([{ id: v1(), title, isDone: false }, ...tasks]);
  };

  const changeTaskStatus = (id: string, isDone: boolean) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, isDone } : task))
    );
  };

  let filteredTasks = tasks;
  if (filterValue === "active") {
    filteredTasks = tasks.filter((task) => !task.isDone);
  }
  if (filterValue === "completed") {
    filteredTasks = tasks.filter((task) => task.isDone);
  }

  return (
    <div className="App">
      <TodoList
        headerText="What to learn"
        tasks={filteredTasks}
        removeTask={removeTask}
        addTask={addTask}
        setFilterValue={setFilterValue}
        changeTaskStatus={changeTaskStatus}
        filterValue={filterValue}
      />
    </div>
  );
}

export default App;
