import { v1 } from 'uuid';
import {
  todoListsAC,
  todoListsReducer,
  TodoListsType,
} from './todolists-reducer';

let todoListId1: string;
let todoListId2: string;
let startState: TodoListsType;
beforeEach(() => {
  todoListId1 = v1();
  todoListId2 = v1();

  startState = [
    { id: todoListId1, title: 'What to learn', filterValue: 'all' },
    { id: todoListId2, title: 'What to buy', filterValue: 'all' },
  ];
});

test('todolist should remove correctly', () => {
  const endState = todoListsReducer(
    startState,
    todoListsAC.removeTodoList(todoListId1)
  );

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId2);
});

test('todolist should be added correctly', () => {
  const newTodoListTitle = 'New todolist';

  const endState = todoListsReducer(
    startState,
    todoListsAC.addTodoList(newTodoListTitle)
  );

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodoListTitle);
});

test('filter value in todolist should change correctly', () => {
  const newFilterValue = 'completed';

  const endState = todoListsReducer(
    startState,
    todoListsAC.changeTodoListFilterValue(todoListId1, newFilterValue)
  );

  expect(endState[0].filterValue).toBe(newFilterValue);
  expect(endState[1].filterValue).toBe(startState[1].filterValue);
});

test('title in todolist should change correctly', () => {
  const newTitle = 'Changed title';

  const endState = todoListsReducer(
    startState,
    todoListsAC.changeTodoListTitle(todoListId1, newTitle)
  );

  expect(endState[0].title).toBe('Changed title');
  expect(endState[1].title).toBe(startState[1].title);
});
