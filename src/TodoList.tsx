import React from 'react';
import { FilterValueType } from './App';

type TodoListPropsType = {
  headerText: string;
  tasks: Array<TaskType>;
  removeTask: (id: number) => void;
  filterTasks: (filterValue: FilterValueType) => void;
};

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

export const TodoList = (props: TodoListPropsType) => {
  return (
    <div>
      <h3>{props.headerText}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map((task) => (
          <li>
            <input type="checkbox" checked={task.isDone} />
            <span>{task.title}</span>{' '}
            <button
              onClick={() => {
                props.removeTask(task.id);
              }}
            >
              x
            </button>
          </li>
        ))}
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
};
