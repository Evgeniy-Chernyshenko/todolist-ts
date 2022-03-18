import React, { memo, useCallback } from 'react';
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

export type OnClickFilterButtonCallbackType = (
  filterValue: FilterValueType
) => () => void;

export type ChangeTodoListTitleCallbackType = (title: string) => void;

export type OnAddItemCallbackType = (title: string) => void;

export const TodoList = memo((props: TodoListPropsType) => {
  console.log('render TodoList');

  const todoList = useSelector<RootStateType, TodoListType>(
    (state) => state.todoLists.find((t) => t.id === props.id)!
  );
  const tasks = useSelector<RootStateType, TaskType[]>((state) => {
    return state.tasks[props.id];
  });
  const dispatch = useDispatch();

  let filteredTasks = tasks;
  if (props.filterValue === 'active') {
    filteredTasks = tasks.filter((t) => !t.isDone);
  }
  if (props.filterValue === 'completed') {
    filteredTasks = tasks.filter((t) => t.isDone);
  }

  const onClickFilterButtonCallback: OnClickFilterButtonCallbackType =
    useCallback(
      (filterValue) => () => {
        dispatch(todoListsAC.changeTodoListFilterValue(props.id, filterValue));
      },
      [dispatch, props.id]
    );

  const removeTodoListCallback = useCallback(() => {
    dispatch(todoListsAC.removeTodoList(props.id));
  }, [dispatch, props.id]);

  const onAddItemCallback: OnAddItemCallbackType = useCallback(
    (title) => {
      dispatch(tasksAC.addTask(props.id, title));
    },
    [dispatch, props.id]
  );

  const changeTodoListTitleCallback: ChangeTodoListTitleCallbackType =
    useCallback(
      (title) => {
        dispatch(todoListsAC.changeTodoListTitle(props.id, title));
      },
      [dispatch, props.id]
    );

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
              {filteredTasks.map((t, i) => (
                <Task
                  key={t.id}
                  id={t.id}
                  todoListId={props.id}
                  isLast={i === filteredTasks.length - 1}
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
});
