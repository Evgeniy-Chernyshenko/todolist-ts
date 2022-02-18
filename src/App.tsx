import React, { useState } from 'react';
import { v1 } from 'uuid';
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

export type FilterValueType = 'all' | 'active' | 'completed';

type TodoListType = {
  id: string;
  title: string;
  filterValue: FilterValueType;
};

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TasksType = {
  [todoListId: string]: TaskType[];
};

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

export type RemoveTaskType = (todoListId: string, taskId: string) => void;

export type RemoveTodoListType = (id: string) => void;

export type AddTaskType = (todoListId: string, title: string) => void;

export type ChangeFilterValueType = (
  todoListId: string,
  filterValue: FilterValueType
) => void;

export type ChangeTodoListTitleType = (
  todoListId: string,
  title: string
) => void;

function App() {
  const todoListId1 = v1();
  const todoListId2 = v1();

  const [todoLists, setTodoLists] = useState<TodoListType[]>([
    { id: todoListId1, title: 'What to learn', filterValue: 'all' },
    { id: todoListId2, title: 'What to buy', filterValue: 'all' },
  ]);
  const [tasks, setTasks] = useState<TasksType>({
    [todoListId1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'Redux', isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: 'Bread', isDone: true },
      { id: v1(), title: 'Laptop', isDone: false },
      { id: v1(), title: 'Elephant', isDone: false },
    ],
  });
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const removeTask: RemoveTaskType = (todoListId, taskId) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].filter((t) => t.id !== taskId),
    });
  };

  const addTask: AddTaskType = (todoListId, title) => {
    setTasks({
      ...tasks,
      [todoListId]: [{ id: v1(), title, isDone: false }, ...tasks[todoListId]],
    });
  };

  const changeTaskStatus: ChangeTaskStatusType = (todoListId, id, isDone) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map((t) =>
        t.id === id ? { ...t, isDone } : t
      ),
    });
  };

  const changeTaskTitle: ChangeTaskTitleType = (todoListId, id, title) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map((t) =>
        t.id === id ? { ...t, title } : t
      ),
    });
  };

  const changeFilterValue: ChangeFilterValueType = (
    todoListId,
    filterValue
  ) => {
    setTodoLists(
      todoLists.map((tl) =>
        tl.id === todoListId ? { ...tl, filterValue } : tl
      )
    );
  };

  const changeTodoListTitle: ChangeTodoListTitleType = (todoListId, title) => {
    setTodoLists(
      todoLists.map((tl) => (tl.id === todoListId ? { ...tl, title } : tl))
    );
  };

  const getFilteredTasks = (todoList: TodoListType) => {
    if (todoList.filterValue === 'active') {
      return tasks[todoList.id].filter((t) => !t.isDone);
    }

    if (todoList.filterValue === 'completed') {
      return tasks[todoList.id].filter((t) => t.isDone);
    }

    return tasks[todoList.id];
  };

  const removeTodoList: RemoveTodoListType = (id) => {
    console.log('removeTodoList');

    setTodoLists(todoLists.filter((tl) => tl.id !== id));
  };

  const addTodoList = (title: string) => {
    const id = v1();

    setTodoLists([{ id, title, filterValue: 'all' }, ...todoLists]);

    setTasks({ ...tasks, [id]: [] });
  };

  const todoListsComponents = todoLists.map((tl) => (
    <TodoList
      key={tl.id}
      id={tl.id}
      headerText={tl.title}
      tasks={getFilteredTasks(tl)}
      removeTask={removeTask}
      addTask={addTask}
      changeFilterValue={changeFilterValue}
      changeTaskStatus={changeTaskStatus}
      filterValue={tl.filterValue}
      removeTodoList={removeTodoList}
      changeTaskTitle={changeTaskTitle}
      changeTodoListTitle={changeTodoListTitle}
    />
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
          <Box sx={{ flexGrow: 1, justifyContent: 'left' }}>
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
            sx={{ flexGrow: 1, textAlign: 'center' }}
          >
            TodoList app
          </Typography>
          <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
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

export default App;
