import React, { useState } from "react";
import { v1 } from "uuid";
import "./App.css";
import { TodoList } from "./TodoList";

export type FilterValueType = "all" | "active" | "completed";

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

export type RemoveTaskType = (todoListId: string, taskId: string) => void;

export type RemoveTodoListType = (id: string) => void;

function App() {
  const todoListId1 = v1();
  const todoListId2 = v1();

  const [todoLists, setTodoLists] = useState<TodoListType[]>([
    { id: todoListId1, title: "What to learn", filterValue: "all" },
    { id: todoListId2, title: "What to buy", filterValue: "all" },
  ]);
  const [tasks, setTasks] = useState<TasksType>({
    [todoListId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "Redux", isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: "Bread", isDone: true },
      { id: v1(), title: "Butter", isDone: true },
      { id: v1(), title: "Laptop", isDone: false },
      { id: v1(), title: "Elephant", isDone: false },
    ],
  });

  const removeTask: RemoveTaskType = (todoListId, taskId) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].filter((t) => t.id !== taskId),
    });
  };

  const addTask = (todoListId: string, title: string) => {
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

  const changeFilterValue = (
    todoListId: string,
    filterValue: FilterValueType
  ) => {
    setTodoLists(
      todoLists.map((tl) =>
        tl.id === todoListId ? { ...tl, filterValue } : tl
      )
    );
  };

  const getFilteredTasks = (todoList: TodoListType) => {
    if (todoList.filterValue === "active") {
      return tasks[todoList.id].filter((t) => !t.isDone);
    }

    if (todoList.filterValue === "completed") {
      return tasks[todoList.id].filter((t) => t.isDone);
    }

    return tasks[todoList.id];
  };

  const removeTodoList: RemoveTodoListType = (id) => {
    setTodoLists(todoLists.filter((tl) => tl.id !== id));
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
    />
  ));

  return <div className="App">{todoListsComponents}</div>;
}

export default App;
