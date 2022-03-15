import React, { useState } from 'react';
import { TodoList } from './TodoList';
import { AddItemForm } from './AddItemForm';
import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { DarkMode, LightMode, Menu } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';
import {
  FilterValueType,
  todoListsAC,
  TodoListsType,
} from './store/todolists-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from './store/state';

export type RemoveTaskType = (todoListId: string, taskId: string) => void;

export type AddTaskType = (todoListId: string, title: string) => void;

export type ChangeTaskStatusType = (
  todoListId: string,
  id: string,
  isDone: boolean
) => void;

export type ChangeTaskTitleType = (
  todoListId: string,
  id: string,
  title: string
) => void;

export type RemoveTodoListType = (id: string) => void;

export type ChangeFilterValueType = (
  todoListId: string,
  filterValue: FilterValueType
) => void;

export type ChangeTodoListTitleType = (
  todoListId: string,
  title: string
) => void;

function AppWithRedux() {
  console.log('AppWithRedux');

  // const state = useSelector<RootStateType, RootStateType>((state) => state);
  // const todoLists = state.todoLists;
  const todoLists = useSelector<RootStateType, TodoListsType>(
    (state) => state.todoLists
  );
  const dispatch = useDispatch();

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const addTodoList = (title: string) => {
    dispatch(todoListsAC.addTodoList(title));
  };

  const todoListsComponents = todoLists.map((tl) => (
    <TodoList key={tl.id} id={tl.id} filterValue={tl.filterValue} />
  ));

  const lightTheme = createTheme();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexBasis: '100%', justifyContent: 'left' }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <Menu />
            </IconButton>
          </Box>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexBasis: '100%', textAlign: 'center' }}
          >
            TodoList app
          </Typography>
          <Box sx={{ flexBasis: '100%', textAlign: 'right' }}>
            <IconButton onClick={() => setIsDarkTheme(!isDarkTheme)}>
              {isDarkTheme ? (
                <LightMode />
              ) : (
                <DarkMode sx={{ color: '#ffffff' }} />
              )}
            </IconButton>
            <Button color="inherit">Login</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: '40px', mb: '40px' }}>
        <AddItemForm onAddItemCallback={addTodoList} />
        <Grid container spacing="40px" sx={{ mt: '0px' }}>
          {todoListsComponents}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default AppWithRedux;
