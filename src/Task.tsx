import { DeleteOutline } from '@mui/icons-material';
import { Checkbox, IconButton, ListItem, Typography } from '@mui/material';
import React, { ChangeEvent, memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { EditableItem, OnChangeItemTitleCallback } from './EditableItem';
import { tasksAC, TaskType } from './store/tasks-reducer';

type TaskPropsType = {
  task: TaskType;
  todoListId: string;
  isLast: boolean;
};

export const Task = memo((props: TaskPropsType) => {
  console.log('render Task', props);

  const dispatch = useDispatch();

  const onChangeTaskStatusHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        tasksAC.changeTaskStatus(
          props.todoListId,
          props.task.id,
          e.currentTarget.checked
        )
      );
    },
    [dispatch, props.task.id, props.todoListId]
  );

  const onClickRemoveTaskHandler = useCallback(() => {
    dispatch(tasksAC.removeTask(props.todoListId, props.task.id));
  }, [dispatch, props.task.id, props.todoListId]);

  const onChangeTitleCallback: OnChangeItemTitleCallback = useCallback(
    (title) => {
      dispatch(tasksAC.changeTaskTitle(props.todoListId, props.task.id, title));
    },
    [dispatch, props.todoListId, props.task.id]
  );

  return (
    <ListItem
      divider
      {...{
        sx: { pl: 0, pr: 0, ...(props.isLast && { border: 'none' }) },
      }}
    >
      <Checkbox
        checked={props.task.isDone}
        onChange={onChangeTaskStatusHandler}
      />
      <Typography component="div" sx={{ flexGrow: 1, wordBreak: 'break-all' }}>
        <EditableItem
          title={props.task.title}
          onChangeItemTitleCallback={onChangeTitleCallback}
          className={props.task.isDone ? 'isDone' : ''}
        />
      </Typography>
      <IconButton onClick={onClickRemoveTaskHandler}>
        <DeleteOutline />
      </IconButton>
    </ListItem>
  );
});
