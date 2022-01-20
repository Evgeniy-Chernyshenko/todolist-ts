import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type FilterValueType = "all" | "active" | "completed";

type TodoListPropsType = {
  headerText: string;
  tasks: TaskType[];
  removeTask: (id: string) => void;
  addTask: (newTaskTitle: string) => void;
};

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export const TodoList = (props: TodoListPropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [filterValue, setFilterValue] = useState<FilterValueType>("all");

  let filteredTasks = props.tasks;
  if (filterValue === "active") {
    filteredTasks = props.tasks.filter((task) => !task.isDone);
  }
  if (filterValue === "completed") {
    filteredTasks = props.tasks.filter((task) => task.isDone);
  }

  const addTask = (title: string) => {
    const clearTitle = title.trim();

    if (clearTitle.length) {
      props.addTask(clearTitle);
    }

    setNewTaskTitle("");
  };

  const onChangeNewTaskTitleHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setNewTaskTitle(event.currentTarget.value);
  };

  const onKeyPressNewTaskTitleHandler = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      addTask(newTaskTitle);
    }
  };

  const onClickAddTaskHandler = () => {
    addTask(newTaskTitle);
  };

  const onClickTasksFilterHandler = (filterValue: FilterValueType) => {
    setFilterValue(filterValue);
  };

  const onClickRemoveTaskHandler = (id: string) => {
    props.removeTask(id);
  };

  return (
    <div>
      <h3>{props.headerText}</h3>
      <div>
        <input
          onChange={onChangeNewTaskTitleHandler}
          onKeyPress={onKeyPressNewTaskTitleHandler}
          value={newTaskTitle}
        />
        <button onClick={onClickAddTaskHandler}>+</button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input type="checkbox" checked={task.isDone} />
            <span>{task.title}</span>{" "}
            <button
              onClick={() => {
                onClickRemoveTaskHandler(task.id);
              }}
            >
              x
            </button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => onClickTasksFilterHandler("all")}>All</button>
        <button onClick={() => onClickTasksFilterHandler("active")}>
          Active
        </button>
        <button onClick={() => onClickTasksFilterHandler("completed")}>
          Completed
        </button>
      </div>
    </div>
  );
};
