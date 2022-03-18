import { DeleteOutline } from '@mui/icons-material';
import { Checkbox, IconButton, ListItem, Typography } from '@mui/material';
import React, { ChangeEvent, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditableItem, OnChangeItemTitleCallback } from './EditableItem';
import { RootStateType } from './store/state';
import { tasksAC, TaskType } from './store/tasks-reducer';

type TaskPropsType = {
  id: string;
  todoListId: string;
  isLast: boolean;
};

export const Task = memo(({ id, ...props }: TaskPropsType) => {
  console.log('render Task');

  const task = useSelector<RootStateType, TaskType>(
    (state) => state.tasks[props.todoListId].find((t) => t.id === id)!
  );
  const dispatch = useDispatch();

  const onChangeTaskStatusHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        tasksAC.changeTaskStatus(props.todoListId, id, e.currentTarget.checked)
      );
    },
    [dispatch, id, props.todoListId]
  );

  const onClickRemoveTaskHandler = useCallback(() => {
    dispatch(tasksAC.removeTask(props.todoListId, id));
  }, [dispatch, id, props.todoListId]);

  const onChangeTitleCallback: OnChangeItemTitleCallback = useCallback(
    (title) => {
      dispatch(tasksAC.changeTaskTitle(props.todoListId, id, title));
    },
    [dispatch, props.todoListId, id]
  );

  return (
    <ListItem
      key={id}
      divider
      {...{
        sx: { pl: 0, pr: 0, ...(props.isLast && { border: 'none' }) },
      }}
    >
      <Checkbox checked={task.isDone} onChange={onChangeTaskStatusHandler} />
      <Typography component="div" sx={{ flexGrow: 1, wordBreak: 'break-all' }}>
        <EditableItem
          title={task.title}
          onChangeItemTitleCallback={onChangeTitleCallback}
          className={task.isDone ? 'isDone' : ''}
        />
      </Typography>
      <IconButton onClick={onClickRemoveTaskHandler}>
        <DeleteOutline />
      </IconButton>
    </ListItem>
  );
});
