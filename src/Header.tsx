import React from "react";

type TodoListHeaderPropsType = {
  headerText: string;
  removeTodoListCallback: () => void;
};

export const Header = (props: TodoListHeaderPropsType) => {
  return (
    <h3>
      {props.headerText}{" "}
      <button onClick={props.removeTodoListCallback}>X</button>
    </h3>
  );
};
