import React from 'react';
import { Header } from './Header';
import { Task } from './Task';
import { AddItemForm } from './AddItemForm';
import { ButtonsPanel } from './ButtonsPanel';
import { Box, Grid, List, Paper } from '@mui/material';
import {
  FilterValueType,
  todoListsAC,
  TodoListType,
} from './store/todolists-reducer';
import { tasksAC, TaskType } from './store/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from './store/state';

type TodoListPropsType = {
  id: string;
  filterValue: FilterValueType;
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
  console.log('TodoList');

  const todoList = useSelector<RootStateType, TodoListType>(
    (state) => state.todoLists.find((t) => t.id === props.id)!
  );
  const tasks = useSelector<RootStateType, TaskType[]>((state) => {
    if (props.filterValue === 'active') {
      return state.tasks[props.id].filter((t) => !t.isDone);
    }

    if (props.filterValue === 'completed') {
      return state.tasks[props.id].filter((t) => t.isDone);
    }

    return state.tasks[props.id];
  });
  const dispatch = useDispatch();

  const onClickFilterButtonCallback: OnClickFilterButtonCallbackType =
    (filterValue) => () => {
      dispatch(todoListsAC.changeTodoListFilterValue(props.id, filterValue));
    };

  const removeTodoListCallback = () => {
    dispatch(todoListsAC.removeTodoList(props.id));
  };

  const onAddItemCallback: OnAddItemCallbackType = (title) => {
    dispatch(tasksAC.addTask(props.id, title));
  };

  const changeTaskStatusCallBack: ChangeTaskStatusCallBackType = (
    taskId,
    isDone
  ) => {
    dispatch(tasksAC.changeTaskStatus(props.id, taskId, isDone));
  };

  const removeTaskCallback: RemoveTaskCallbackType = (taskId) => {
    dispatch(tasksAC.removeTask(props.id, taskId));
  };

  const changeTaskTitleCallback: ChangeTaskTitleCallbackType = (
    taskId,
    title
  ) => {
    dispatch(tasksAC.changeTaskTitle(props.id, taskId, title));
  };

  const changeTodoListTitleCallback: ChangeTodoListTitleCallbackType = (
    title
  ) => {
    dispatch(todoListsAC.changeTodoListTitle(props.id, title));
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
              headerText={todoList.title}
              removeTodoListCallback={removeTodoListCallback}
              changeTodoListTitleCallback={changeTodoListTitleCallback}
            />
            <AddItemForm onAddItemCallback={onAddItemCallback} />
            <List>
              {tasks.map((task, i) => (
                <Task
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  isDone={task.isDone}
                  changeTaskStatusCallback={changeTaskStatusCallBack}
                  removeTaskCallback={removeTaskCallback}
                  changeTaskTitleCallback={changeTaskTitleCallback}
                  isLast={i === tasks.length - 1}
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
