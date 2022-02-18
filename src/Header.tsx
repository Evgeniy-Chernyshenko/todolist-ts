import React from 'react';
import { ChangeTodoListTitleCallbackType } from './TodoList';
import { EditableItem } from './EditableItem';
import { Grid, IconButton, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';

type TodoListHeaderPropsType = {
  headerText: string;
  removeTodoListCallback: () => void;
  changeTodoListTitleCallback: ChangeTodoListTitleCallbackType;
};

export const Header = (props: TodoListHeaderPropsType) => {
  return (
    <Grid
      container
      sx={{
        alignItems: 'center',
        mb: '10px',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, wordBreak: 'break-all' }}
      >
        <EditableItem
          title={props.headerText}
          onChangeItemTitleCallback={props.changeTodoListTitleCallback}
        />{' '}
      </Typography>
      <IconButton onClick={props.removeTodoListCallback}>
        <Delete />
      </IconButton>
    </Grid>
  );
};
