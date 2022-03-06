import { todolistsReducer } from './todolists-reducer';
import { todolistsAC, TodolistsType } from './todolists-reducer';
import { TasksType, tasksReducer, tasksAC } from './tasks-reducer';

const startState: TasksType = {
  todolistId1: [
    { id: 'taskId1', title: 'Bread', isDone: false },
    { id: 'taskId2', title: 'Butter', isDone: true },
    { id: 'taskId3', title: 'Juice', isDone: false },
  ],
  todolistId2: [
    { id: 'taskId4', title: 'Elephant', isDone: false },
    { id: 'taskId5', title: 'Laptop', isDone: true },
  ],
};

test('task should be removed', () => {
  const endState = tasksReducer(
    startState,
    tasksAC.removeTask('todolistId1', 'taskId2')
  );

  expect(endState).toEqual({
    todolistId1: [
      { id: 'taskId1', title: 'Bread', isDone: false },
      { id: 'taskId3', title: 'Juice', isDone: false },
    ],
    todolistId2: [
      { id: 'taskId4', title: 'Elephant', isDone: false },
      { id: 'taskId5', title: 'Laptop', isDone: true },
    ],
  });
});

test('task should be added', () => {
  const endState = tasksReducer(
    startState,
    tasksAC.addTask('todolistId2', 'New task')
  );

  expect(endState.todolistId1.length).toBe(3);
  expect(endState.todolistId2.length).toBe(3);
  expect(endState.todolistId2[0].id).toBeDefined();
  expect(endState.todolistId2[0].title).toBe('New task');
  expect(endState.todolistId2[0].isDone).toBe(false);
});

test('task should be change status', () => {
  const endState = tasksReducer(
    startState,
    tasksAC.changeTaskStatus('todolistId2', 'taskId5', false)
  );

  expect(endState.todolistId2[1].isDone).toBe(false);
});

test('task should be change title', () => {
  const endState = tasksReducer(
    startState,
    tasksAC.changeTaskTitle('todolistId2', 'taskId5', 'New title')
  );

  expect(endState.todolistId2[1].title).toBe('New title');
});

test('new property with todolistId and empty array as value should be added when new todolist is added', () => {
  const action = todolistsAC.addTodolist('New todolist');

  const todolistsStartState: TodolistsType = [];
  const tasksStartState: TasksType = {};

  const todolistsEndState = todolistsReducer(todolistsStartState, action);
  const tasksEndState = tasksReducer(tasksStartState, action);

  expect(todolistsEndState[0].id).toBe(Object.keys(tasksEndState)[0]);
});

test('property with todolistId should be deleted when todolist is deleted', () => {
  const endState = tasksReducer(
    startState,
    todolistsAC.removeTodolist('todolistId1')
  );

  expect(Object.keys(endState).length).toBe(1);
  expect(endState.todolistId1).not.toBeDefined();
});
