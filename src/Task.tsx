import React, { ChangeEvent } from "react";
import { ChangeTaskStatusType, RemoveTaskType, TaskType } from "./App";

type TaskPropsType = TaskType & {
  todoListId: string;
  changeTaskStatus: ChangeTaskStatusType;
  removeTask: RemoveTaskType;
};

export const Task = (props: TaskPropsType) => {
  const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(props.todoListId, props.id, e.currentTarget.checked);
  };

  const onClickRemoveTaskHandler = () => {
    props.removeTask(props.todoListId, props.id);
  };

  return (
    <li key={props.id}>
      <input
        type="checkbox"
        checked={props.isDone}
        onChange={onChangeTaskStatusHandler}
      />
      <span className={props.isDone ? "isDone" : ""}>{props.title}</span>{" "}
      <button onClick={onClickRemoveTaskHandler}>x</button>
    </li>
  );
};
