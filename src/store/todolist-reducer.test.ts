import { v1 } from "uuid";
import { todolistAC, todolistReducer, TodolistsType } from "./todolist-reducer";

const todoListId1 = v1();
const todoListId2 = v1();

const startState: TodolistsType = [
  { id: todoListId1, title: "What to learn", filterValue: "all" },
  { id: todoListId2, title: "What to buy", filterValue: "all" },
];

test("todolist should remove correctly", () => {
  const endState = todolistReducer(
    startState,
    todolistAC.removeTodolistAC(todoListId1)
  );

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId2);
});

test("todolist should be added correctly", () => {
  const newTodolistTitle = "New todolist";

  const endState = todolistReducer(
    startState,
    todolistAC.addTodolistAC(newTodolistTitle)
  );

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolistTitle);
});

test("filter value in todolist should change correctly", () => {
  const newFilterValue = "completed";

  const endState = todolistReducer(
    startState,
    todolistAC.changeTodolistFilterValueAC(todoListId1, newFilterValue)
  );

  expect(endState[0].filterValue).toBe(newFilterValue);
  expect(endState[1].filterValue).toBe(startState[1].filterValue);
});

test("title in todolist should change correctly", () => {
  const newTitle = "Changed title";

  const endState = todolistReducer(
    startState,
    todolistAC.changeTodolistTitleAC(todoListId1, newTitle)
  );

  expect(endState[0].title).toBe("Changed title");
  expect(endState[1].title).toBe(startState[1].title);
});
