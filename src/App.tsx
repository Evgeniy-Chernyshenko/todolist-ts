import React, { useState } from "react";
import { v1 } from "uuid";
import "./App.css";
import { TaskType, TodoList } from "./TodoList";

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: "HTML&CSS", isDone: false },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
  ]);

  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const addTask = (title: string) => {
    setTasks([{ id: v1(), title, isDone: false }, ...tasks]);
  };

  return (
    <div className="App">
      <TodoList
        headerText="What to learn"
        tasks={tasks}
        removeTask={removeTask}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
