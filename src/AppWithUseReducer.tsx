// import React, { useState, useReducer } from 'react';
// import { v1 } from 'uuid';
// import { TodoList } from './TodoList';
// import { AddItemForm } from './AddItemForm';
// import {
//   AppBar,
//   Button,
//   Container,
//   CssBaseline,
//   Grid,
//   IconButton,
//   Toolbar,
//   Typography,
// } from '@mui/material';
// import { DarkMode, LightMode, Menu } from '@mui/icons-material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { Box } from '@mui/system';
// import {
//   FilterValueType,
//   todoListsAC,
//   todoListsReducer,
//   TodoListType,
// } from './store/todolists-reducer';
// import { tasksAC, tasksReducer } from './store/tasks-reducer';

// export type RemoveTaskType = (todoListId: string, taskId: string) => void;

// export type AddTaskType = (todoListId: string, title: string) => void;

// export type ChangeTaskStatusType = (
//   todoListId: string,
//   id: string,
//   isDone: boolean
// ) => void;

// export type ChangeTaskTitleType = (
//   todoListId: string,
//   id: string,
//   title: string
// ) => void;

// export type RemoveTodoListType = (id: string) => void;

// export type ChangeFilterValueType = (
//   todoListId: string,
//   filterValue: FilterValueType
// ) => void;

// export type ChangeTodoListTitleType = (
//   todoListId: string,
//   title: string
// ) => void;

// function AppWithUseReducer() {
//   const todoListId1 = v1();
//   const todoListId2 = v1();

//   const [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
//     { id: todoListId1, title: 'What to learn', filterValue: 'all' },
//     { id: todoListId2, title: 'What to buy', filterValue: 'all' },
//   ]);
//   const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
//     [todoListId1]: [
//       { id: v1(), title: 'HTML&CSS', isDone: true },
//       { id: v1(), title: 'JS', isDone: true },
//       { id: v1(), title: 'React', isDone: false },
//       { id: v1(), title: 'Redux', isDone: false },
//     ],
//     [todoListId2]: [
//       { id: v1(), title: 'Bread', isDone: true },
//       { id: v1(), title: 'Laptop', isDone: false },
//       { id: v1(), title: 'Elephant', isDone: false },
//     ],
//   });
//   const [isDarkTheme, setIsDarkTheme] = useState(false);

//   const removeTask: RemoveTaskType = (todoListId, taskId) => {
//     dispatchToTasks(tasksAC.removeTask(todoListId, taskId));
//   };
//   const addTask: AddTaskType = (todoListId, title) => {
//     dispatchToTasks(tasksAC.addTask(todoListId, title));
//   };
//   const changeTaskStatus: ChangeTaskStatusType = (todoListId, id, isDone) => {
//     dispatchToTasks(tasksAC.changeTaskStatus(todoListId, id, isDone));
//   };
//   const changeTaskTitle: ChangeTaskTitleType = (todoListId, id, title) => {
//     dispatchToTasks(tasksAC.changeTaskTitle(todoListId, id, title));
//   };
//   const getFilteredTasks = (todoList: TodoListType) => {
//     if (todoList.filterValue === 'active') {
//       return tasks[todoList.id].filter((t) => !t.isDone);
//     }

//     if (todoList.filterValue === 'completed') {
//       return tasks[todoList.id].filter((t) => t.isDone);
//     }

//     return tasks[todoList.id];
//   };

//   const removeTodoList: RemoveTodoListType = (id) => {
//     const action = todoListsAC.removeTodoList(id);

//     dispatchToTodoLists(action);
//     dispatchToTasks(action);
//   };
//   const addTodoList = (title: string) => {
//     const action = todoListsAC.addTodoList(title);

//     dispatchToTodoLists(action);
//     dispatchToTasks(action);
//   };
//   const changeFilterValue: ChangeFilterValueType = (
//     todoListId,
//     filterValue
//   ) => {
//     dispatchToTodoLists(
//       todoListsAC.changeTodoListFilterValue(todoListId, filterValue)
//     );
//   };
//   const changeTodoListTitle: ChangeTodoListTitleType = (todoListId, title) => {
//     dispatchToTodoLists(todoListsAC.changeTodoListTitle(todoListId, title));
//   };

//   const todoListsComponents = todoLists.map((tl) => (
//     <TodoList
//       key={tl.id}
//       id={tl.id}
//       headerText={tl.title}
//       tasks={getFilteredTasks(tl)}
//       removeTask={removeTask}
//       addTask={addTask}
//       changeFilterValue={changeFilterValue}
//       changeTaskStatus={changeTaskStatus}
//       filterValue={tl.filterValue}
//       removeTodoList={removeTodoList}
//       changeTaskTitle={changeTaskTitle}
//       changeTodoListTitle={changeTodoListTitle}
//     />
//   ));

//   const lightTheme = createTheme();

//   const darkTheme = createTheme({
//     palette: {
//       mode: 'dark',
//     },
//   });

//   return (
//     <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
//       <CssBaseline />
//       <AppBar position="static">
//         <Toolbar>
//           <Box sx={{ flexBasis: '100%', justifyContent: 'left' }}>
//             <IconButton
//               size="large"
//               edge="start"
//               color="inherit"
//               aria-label="menu"
//             >
//               <Menu />
//             </IconButton>
//           </Box>
//           <Typography
//             variant="h6"
//             component="div"
//             sx={{ flexBasis: '100%', textAlign: 'center' }}
//           >
//             TodoList app
//           </Typography>
//           <Box sx={{ flexBasis: '100%', textAlign: 'right' }}>
//             <IconButton onClick={() => setIsDarkTheme(!isDarkTheme)}>
//               {isDarkTheme ? (
//                 <LightMode />
//               ) : (
//                 <DarkMode sx={{ color: '#ffffff' }} />
//               )}
//             </IconButton>
//             <Button color="inherit">Login</Button>
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <Container sx={{ mt: '40px', mb: '40px' }}>
//         <AddItemForm onAddItemCallback={addTodoList} />
//         <Grid container spacing="40px" sx={{ mt: '0px' }}>
//           {todoListsComponents}
//         </Grid>
//       </Container>
//     </ThemeProvider>
//   );
// }

// export default AppWithUseReducer;

export default {};
