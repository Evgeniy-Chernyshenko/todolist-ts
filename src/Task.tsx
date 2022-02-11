import React, { ChangeEvent } from "react";
import { TaskType } from "./App";
import { Button } from "./Button";
import { EditableItem, OnChangeItemTitleCallback } from "./EditableItem";
import {
  ChangeTaskStatusCallBackType,
  ChangeTaskTitleCallbackType,
  RemoveTaskCallbackType,
} from "./TodoList";

type TaskPropsType = TaskType & {
  changeTaskStatusCallback: ChangeTaskStatusCallBackType;
  removeTaskCallback: RemoveTaskCallbackType;
  changeTaskTitleCallback: ChangeTaskTitleCallbackType;
};

export const Task = (props: TaskPropsType) => {
  const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatusCallback(props.id, e.currentTarget.checked);
  };

  const onClickRemoveTaskHandler = () => {
    props.removeTaskCallback(props.id);
  };

  const onChangeTitleCallback: OnChangeItemTitleCallback = (title) => {
    props.changeTaskTitleCallback(props.id, title);
  };

  return (
    <li key={props.id}>
      <input
        type="checkbox"
        checked={props.isDone}
        onChange={onChangeTaskStatusHandler}
      />
      <EditableItem
        className={props.isDone ? "isDone" : ""}
        title={props.title}
        onChangeItemTitleCallback={onChangeTitleCallback}
      />{" "}
      <Button onClick={onClickRemoveTaskHandler}>x</Button>
    </li>
  );
};
