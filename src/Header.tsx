import React from "react";
import { Button } from "./Button";
import { ChangeTodoListTitleCallbackType } from "./TodoList";
import { EditableItem } from "./EditableItem";

type TodoListHeaderPropsType = {
  headerText: string;
  removeTodoListCallback: () => void;
  changeTodoListTitleCallback: ChangeTodoListTitleCallbackType;
};

export const Header = (props: TodoListHeaderPropsType) => {
  return (
    <h3>
      <EditableItem
        title={props.headerText}
        onChangeItemTitleCallback={props.changeTodoListTitleCallback}
      />{" "}
      <Button onClick={props.removeTodoListCallback}>X</Button>
    </h3>
  );
};
