import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { OnAddItemCallbackType } from "./TodoList";
import { Button } from "./Button";

type AddItemFormPropsType = {
  onAddItemCallback: OnAddItemCallbackType;
};

export const AddItemForm = (props: AddItemFormPropsType) => {
  const [itemTitle, setItemTitle] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);

  const addItem = (title: string) => {
    const clearItemTitle = title.trim();

    if (clearItemTitle.length) {
      props.onAddItemCallback(clearItemTitle);
    } else {
      setHasError(true);
    }

    setItemTitle("");
  };

  const onChangeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setItemTitle(e.currentTarget.value);
    setHasError(false);
  };

  const onKeyPressItemTitleHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && addItem(itemTitle);
  };

  const onClickAddTaskHandler = () => {
    addItem(itemTitle);
  };

  return (
    <>
      <input
        onChange={onChangeItemTitleHandler}
        onKeyPress={onKeyPressItemTitleHandler}
        value={itemTitle}
        className={hasError ? "error" : ""}
      />
      <Button onClick={onClickAddTaskHandler}>+</Button>
      {hasError && <div className={"errorMessage"}>Name is required</div>}
    </>
  );
};
