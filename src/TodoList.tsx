import React from 'react';
import {
  TaskType,
  FilterValueType,
  ChangeTaskStatusType,
  RemoveTaskType,
  RemoveTodoListType,
  ChangeTaskTitleType,
  AddTaskType,
  ChangeFilterValueType,
  ChangeTodoListTitleType,
} from './App';
import { Header } from './Header';
import { Task } from './Task';
import { AddItemForm } from './AddItemForm';
import { ButtonsPanel } from './ButtonsPanel';
import { Box, Grid, List, Paper } from '@mui/material';

type TodoListPropsType = {
  id: string;
  headerText: string;
  tasks: TaskType[];
  removeTask: RemoveTaskType;
  addTask: AddTaskType;
  changeFilterValue: ChangeFilterValueType;
  changeTaskStatus: ChangeTaskStatusType;
  filterValue: FilterValueType;
  removeTodoList: RemoveTodoListType;
  changeTaskTitle: ChangeTaskTitleType;
  changeTodoListTitle: ChangeTodoListTitleType;
};

export type ChangeTaskStatusCallBackType = (
  taskId: string,
  isDone: boolean
) => void;

export type RemoveTaskCallbackType = (taskId: string) => void;

export type ChangeTaskTitleCallbackType = (
  taskId: string,
  title: string
) => void;

export type OnClickFilterButtonCallbackType = (
  filterValue: FilterValueType
) => () => void;

export type ChangeTodoListTitleCallbackType = (title: string) => void;

export type OnAddItemCallbackType = (title: string) => void;

export const TodoList = (props: TodoListPropsType) => {
  const onClickFilterButtonCallback: OnClickFilterButtonCallbackType =
    (filterValue) => () =>
      props.changeFilterValue(props.id, filterValue);

  const removeTodoListCallback = () => {
    props.removeTodoList(props.id);
  };

  const onAddItemCallback: OnAddItemCallbackType = (title) => {
    props.addTask(props.id, title);
  };

  const changeTaskStatusCallBack: ChangeTaskStatusCallBackType = (
    taskId,
    isDone
  ) => {
    props.changeTaskStatus(props.id, taskId, isDone);
  };

  const removeTaskCallback: RemoveTaskCallbackType = (taskId) => {
    props.removeTask(props.id, taskId);
  };

  const changeTaskTitleCallback: ChangeTaskTitleCallbackType = (
    taskId,
    title
  ) => {
    props.changeTaskTitle(props.id, taskId, title);
  };

  const changeTodoListTitleCallback: ChangeTodoListTitleCallbackType = (
    title
  ) => {
    props.changeTodoListTitle(props.id, title);
  };

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Box sx={{ height: '100%' }}>
        <Paper
          elevation={3}
          sx={{
            p: '20px',
            height: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <Header
              headerText={props.headerText}
              removeTodoListCallback={removeTodoListCallback}
              changeTodoListTitleCallback={changeTodoListTitleCallback}
            />
            <AddItemForm onAddItemCallback={onAddItemCallback} />
            <List>
              {props.tasks.map((task, i) => (
                <Task
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  isDone={task.isDone}
                  changeTaskStatusCallback={changeTaskStatusCallBack}
                  removeTaskCallback={removeTaskCallback}
                  changeTaskTitleCallback={changeTaskTitleCallback}
                  isLast={i === props.tasks.length - 1}
                />
              ))}
            </List>
          </div>
          <ButtonsPanel
            filterValue={props.filterValue}
            onClickFilterButtonCallback={onClickFilterButtonCallback}
          />
        </Paper>
      </Box>
    </Grid>
  );
};
