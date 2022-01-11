import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';

export type filterType = 'all' | 'active' | 'completed';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
  ]);
  const [filter, setFilter] = useState<filterType>('all');

  let filteredT = tasks;
  if (filter === 'active') {
    filteredT = tasks.filter(({ isDone }) => !isDone);
  }
  if (filter === 'completed') {
    filteredT = tasks.filter(({ isDone }) => isDone);
  }

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filterTasks = (filter: filterType) => {
    setFilter(filter);
  };

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={filteredT}
        removeTask={removeTask}
        filterTasks={filterTasks}
      />
    </div>
  );
}

export default App;
