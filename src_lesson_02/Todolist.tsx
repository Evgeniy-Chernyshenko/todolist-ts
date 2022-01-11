import React from 'react';
import { filterType } from './App';

type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: number) => void;
  filterTasks: (filter: filterType) => void;
};

export function Todolist(props: PropsType) {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map((task) => {
          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} />{' '}
              <span>{task.title}</span>
              <button onClick={() => props.removeTask(task.id)}>X</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={() => props.filterTasks('all')}>All</button>
        <button onClick={() => props.filterTasks('active')}>Active</button>
        <button onClick={() => props.filterTasks('completed')}>
          Completed
        </button>
      </div>
    </div>
  );
}
