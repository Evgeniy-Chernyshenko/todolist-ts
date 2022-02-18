import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { OnAddItemCallbackType } from './TodoList';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';

type AddItemFormPropsType = {
  onAddItemCallback: OnAddItemCallbackType;
};

export const AddItemForm = (props: AddItemFormPropsType) => {
  const [itemTitle, setItemTitle] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);

  const addItem = (title: string) => {
    const clearItemTitle = title.trim();

    if (clearItemTitle.length) {
      props.onAddItemCallback(clearItemTitle);
    } else {
      setHasError(true);
    }

    setItemTitle('');
  };

  const onChangeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setItemTitle(e.currentTarget.value);
    setHasError(false);
  };

  const onKeyPressItemTitleHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && addItem(itemTitle);
  };

  const onClickAddTaskHandler = () => {
    addItem(itemTitle);
  };

  return (
    <>
      <TextField
        onChange={onChangeItemTitleHandler}
        onKeyPress={onKeyPressItemTitleHandler}
        onBlur={() => setHasError(false)}
        value={itemTitle}
        error={hasError}
        label={hasError ? 'Title is required' : 'Type your title'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={onClickAddTaskHandler}>
                <Add />
              </IconButton>
            </InputAdornment>
          ),

          sx: { pr: 0 },
        }}
        fullWidth
        size="small"
      />
    </>
  );
};
