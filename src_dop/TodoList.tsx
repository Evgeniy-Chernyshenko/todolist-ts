import React, { useState } from 'react';
import { FilterValueType } from './App';
import { UniversalButton } from './components/UniversalButton';
import { UniversalCheckboxInput } from './components/UniversalCheckboxInput';
import { UniversalTextInput } from './components/UniversalTextInput';
import styles from './TodoList.module.css';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodoListPropsType = {
  headerText: string;
  tasks: TaskType[];
  removeTask: (id: string) => void;
  addTask: (newTaskTitle: string) => void;
  setFilterValue: (filter: FilterValueType) => void;
  changeTaskStatus: (id: string, isDone: boolean) => void;
  filterValue: FilterValueType;
};

export const TodoList = (props: TodoListPropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);

  const addTask = (title: string) => {
    const clearTitle = title.trim();

    if (clearTitle.length) {
      props.addTask(clearTitle);
    } else {
      setHasError(true);
    }

    setNewTaskTitle('');
  };

  return (
    <div>
      <h3>{props.headerText}</h3>
      <div>
        {/* <input
          onChange={(e) => {
            setNewTaskTitle(e.currentTarget.value);
            setHasError(false);
          }}
          onKeyPress={(e) => {
            e.key === 'Enter' && addTask(newTaskTitle);
          }}
          value={newTaskTitle}
          className={hasError ? styles.error : undefined}
        /> */}
        <UniversalTextInput
          onChange={(e) => {
            setNewTaskTitle(e.currentTarget.value);
            setHasError(false);
          }}
          onKeyPressEnter={() => {
            addTask(newTaskTitle);
          }}
          value={newTaskTitle}
          className={hasError ? styles.error : undefined}
        />
        {/* <button
          onClick={() => {
            addTask(newTaskTitle);
          }}
        >
          +
        </button> */}
        <UniversalButton
          onClick={() => {
            addTask(newTaskTitle);
          }}
        >
          +
        </UniversalButton>
        {hasError && (
          <div className={styles.errorMessage}>Name is required</div>
        )}
      </div>
      <ul>
        {props.tasks.map((task) => (
          <li key={task.id}>
            {/* <input
              type="checkbox"
              checked={task.isDone}
              onChange={(e) =>
                props.changeTaskStatus(task.id, e.currentTarget.checked)
              }
            /> */}
            <UniversalCheckboxInput
              checked={task.isDone}
              onChangeChecked={(checked) =>
                props.changeTaskStatus(task.id, checked)
              }
            />
            <span className={task.isDone ? styles.isDone : undefined}>
              {task.title}
            </span>{' '}
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
        {/* <button
          className={
            props.filterValue === 'all' ? styles.activeFilter : undefined
          }
          onClick={() => props.setFilterValue('all')}
        > 
          All
        </button>*/}
        <UniversalButton
          className={
            props.filterValue === 'all' ? styles.activeFilter : undefined
          }
          onClick={() => props.setFilterValue('all')}
        >
          All
        </UniversalButton>
        <button
          className={
            props.filterValue === 'active' ? styles.activeFilter : undefined
          }
          onClick={() => props.setFilterValue('active')}
        >
          Active
        </button>
        <button
          className={
            props.filterValue === 'completed' ? styles.activeFilter : undefined
          }
          onClick={() => props.setFilterValue('completed')}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
