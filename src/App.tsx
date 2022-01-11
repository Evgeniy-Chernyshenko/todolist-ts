import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './TodoList';

export type FilterValueType = 'all' | 'active' | 'completed';

function App() {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: 1, title: 'HTML&CSS', isDone: false },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'React', isDone: false },
    { id: 4, title: 'Redux', isDone: false },
  ]);
  const [filterValue, setFilterValue] = useState<FilterValueType>('all');

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filterTasks = (filterValue: FilterValueType) => {
    setFilterValue(filterValue);
  };

  let filteredTasks = tasks;
  if (filterValue === 'active') {
    filteredTasks = tasks.filter((task) => !task.isDone);
  }
  if (filterValue === 'completed') {
    filteredTasks = tasks.filter((task) => task.isDone);
  }

  return (
    <div className="App">
      <TodoList
        headerText="What to learn"
        tasks={filteredTasks}
        removeTask={removeTask}
        filterTasks={filterTasks}
      />
    </div>
  );
}

export default App;
