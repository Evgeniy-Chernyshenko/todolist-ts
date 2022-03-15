import { DeleteOutline } from '@mui/icons-material';
import { Checkbox, IconButton, ListItem, Typography } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { EditableItem, OnChangeItemTitleCallback } from './EditableItem';
import { TaskType } from './store/tasks-reducer';
import {
  ChangeTaskStatusCallBackType,
  ChangeTaskTitleCallbackType,
  RemoveTaskCallbackType,
} from './TodoList';

type TaskPropsType = TaskType & {
  changeTaskStatusCallback: ChangeTaskStatusCallBackType;
  removeTaskCallback: RemoveTaskCallbackType;
  changeTaskTitleCallback: ChangeTaskTitleCallbackType;
  isLast: boolean;
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
    <ListItem
      key={props.id}
      divider
      {...{
        sx: { pl: 0, pr: 0, ...(props.isLast && { border: 'none' }) },
      }}
    >
      <Checkbox checked={props.isDone} onChange={onChangeTaskStatusHandler} />
      <Typography sx={{ flexGrow: 1, wordBreak: 'break-all' }}>
        <EditableItem
          className={props.isDone ? 'isDone' : ''}
          title={props.title}
          onChangeItemTitleCallback={onChangeTitleCallback}
        />
      </Typography>
      <IconButton onClick={onClickRemoveTaskHandler}>
        <DeleteOutline />
      </IconButton>
    </ListItem>
  );
};
