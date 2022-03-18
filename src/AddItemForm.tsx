import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useState,
} from 'react';
import { OnAddItemCallbackType } from './TodoList';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';

type AddItemFormPropsType = {
  onAddItemCallback: OnAddItemCallbackType;
};

export const AddItemForm = React.memo(
  ({ onAddItemCallback }: AddItemFormPropsType) => {
    console.log('render AddItemForm');

    const [itemTitle, setItemTitle] = useState<string>('');
    const [hasError, setHasError] = useState<boolean>(false);

    const addItem = useCallback(
      (title: string) => {
        const clearItemTitle = title.trim();

        if (clearItemTitle.length) {
          onAddItemCallback(clearItemTitle);
        } else {
          setHasError(true);
        }

        setItemTitle('');
      },
      [onAddItemCallback]
    );

    const onChangeItemTitleHandler = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(e.currentTarget.value);
        setHasError(false);
      },
      []
    );

    const onKeyPressItemTitleHandler = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addItem(itemTitle);
      },
      [addItem, itemTitle]
    );

    const onClickAddTaskHandler = useCallback(() => {
      addItem(itemTitle);
    }, [addItem, itemTitle]);

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
  }
);
