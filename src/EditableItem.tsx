import { TextField } from '@mui/material';
import React, {
  ChangeEvent,
  DetailedHTMLProps,
  KeyboardEvent,
  useState,
} from 'react';

type DefaultSpanPropsType = DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

export type OnChangeItemTitleCallback = (title: string) => void;

type EditableItemPropsType = DefaultSpanPropsType & {
  title: string;
  onChangeItemTitleCallback: OnChangeItemTitleCallback;
};

export const EditableItem = ({
  onDoubleClick,
  title,
  onChangeItemTitleCallback,
  ...props
}: EditableItemPropsType) => {
  const [isEditActive, setIsEditActive] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState(title);

  const editItem = () => {
    const clearNewItemTitle = newItemTitle.trim();

    setIsEditActive(false);

    if (!clearNewItemTitle || clearNewItemTitle === title) {
      setNewItemTitle(title);

      return;
    }

    setNewItemTitle(clearNewItemTitle);
    onChangeItemTitleCallback(clearNewItemTitle);
  };

  const onDoubleClickHandler = () => {
    setIsEditActive(true);
  };

  const onBlurHandler = () => {
    editItem();
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && editItem();
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewItemTitle(e.currentTarget.value);
  };

  return isEditActive ? (
    <TextField
      value={newItemTitle}
      autoFocus={true}
      onBlur={onBlurHandler}
      onKeyPress={onKeyPressHandler}
      onChange={onChangeHandler}
      size="small"
      variant="standard"
      fullWidth
    />
  ) : (
    <span {...props} onDoubleClick={onDoubleClickHandler}>
      {title}
    </span>
  );
};
