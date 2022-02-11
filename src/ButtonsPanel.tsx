import React from "react";
import { Button } from "./Button";
import { OnClickFilterButtonCallbackType } from "./TodoList";
import { FilterValueType } from "./App";

type ButtonsPanelPropsType = {
  filterValue: FilterValueType;
  onClickFilterButtonCallback: OnClickFilterButtonCallbackType;
};

export const ButtonsPanel = (props: ButtonsPanelPropsType) => {
  return (
    <div>
      <Button
        isActive={props.filterValue === "all"}
        onClick={props.onClickFilterButtonCallback("all")}
      >
        All
      </Button>
      <Button
        isActive={props.filterValue === "active"}
        onClick={props.onClickFilterButtonCallback("active")}
      >
        Active
      </Button>
      <Button
        isActive={props.filterValue === "completed"}
        onClick={props.onClickFilterButtonCallback("completed")}
      >
        Completed
      </Button>
    </div>
  );
};
