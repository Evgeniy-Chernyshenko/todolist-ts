import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import {
  TaskType,
  FilterValueType,
  ChangeTaskStatusType,
  RemoveTaskType,
  RemoveTodoListType,
} from "./App";
import { Header } from "./Header";
import { Task } from "./Task";
import { StatusButton } from "./StatusButton";

type TodoListPropsType = {
  id: string;
  headerText: string;
  tasks: TaskType[];
  removeTask: RemoveTaskType;
  addTask: (todolistId: string, newTaskTitle: string) => void;
  changeFilterValue: (todolistId: string, filterValue: FilterValueType) => void;
  changeTaskStatus: ChangeTaskStatusType;
  filterValue: FilterValueType;
  removeTodoList: RemoveTodoListType;
};

export const TodoList = (props: TodoListPropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);

  const addTask = (title: string) => {
    const clearTitle = title.trim();

    if (clearTitle.length) {
      props.addTask(props.id, clearTitle);
    } else {
      setHasError(true);
    }

    setNewTaskTitle("");
  };

  const onClickAddTaskHandler = () => {
    addTask(newTaskTitle);
  };

  const onChangeNewTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
    setHasError(false);
  };

  const onKeyPressNewTaskTitleHandler = (
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    e.key === "Enter" && addTask(newTaskTitle);
  };

  const onClickFilterButtonHandler = (filterValue: FilterValueType) => {
    props.changeFilterValue(props.id, filterValue);
  };

  const removeTodoListCallback = () => {
    props.removeTodoList(props.id);
  };

  return (
    <div>
      <Header
        headerText={props.headerText}
        removeTodoListCallback={removeTodoListCallback}
      />
      <div>
        <input
          onChange={onChangeNewTaskTitleHandler}
          onKeyPress={onKeyPressNewTaskTitleHandler}
          value={newTaskTitle}
          className={hasError ? "error" : ""}
        />
        <button onClick={onClickAddTaskHandler}>+</button>
        {hasError && <div className={"errorMessage"}>Name is required</div>}
      </div>
      <ul>
        {props.tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            isDone={task.isDone}
            todoListId={props.id}
            changeTaskStatus={props.changeTaskStatus}
            removeTask={props.removeTask}
          />
        ))}
      </ul>
      <div>
        <StatusButton
          isActive={props.filterValue === "all"}
          onClick={() => onClickFilterButtonHandler("all")}
        >
          All
        </StatusButton>
        <StatusButton
          isActive={props.filterValue === "active"}
          onClick={() => onClickFilterButtonHandler("active")}
        >
          Active
        </StatusButton>
        <StatusButton
          isActive={props.filterValue === "completed"}
          onClick={() => onClickFilterButtonHandler("completed")}
        >
          Completed
        </StatusButton>
      </div>
    </div>
  );
};
