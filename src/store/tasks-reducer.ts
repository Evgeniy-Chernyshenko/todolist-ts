import { todolistsAC } from './todolists-reducer';
import { v1 } from 'uuid';

type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TasksType = {
  [todolistId: string]: TaskType[];
};

type ActionCreatorType = typeof tasksAC;
type ActionCreatorTypeKeys = keyof ActionCreatorType;
type ActionType = ReturnType<
  | ActionCreatorType[ActionCreatorTypeKeys]
  | typeof todolistsAC.addTodolist
  | typeof todolistsAC.removeTodolist
>;

export const tasksAC = {
  removeTask: (todolistId: string, taskId: string) =>
    ({
      type: 'REMOVE_TASK',
      todolistId,
      taskId,
    } as const),
  addTask: (todoListId: string, title: string) =>
    ({
      type: 'ADD_TASK',
      todoListId,
      title,
    } as const),
  changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) =>
    ({
      type: 'CHANGE_TASK_STATUS',
      todoListId,
      taskId,
      isDone,
    } as const),
  changeTaskTitle: (todoListId: string, taskId: string, title: string) =>
    ({
      type: 'CHANGE_TASK_TITLE',
      todoListId,
      taskId,
      title,
    } as const),
};

export const tasksReducer = (
  state: TasksType,
  action: ActionType
): TasksType => {
  switch (action.type) {
    case 'REMOVE_TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(
          (t) => t.id !== action.taskId
        ),
      };

    case 'ADD_TASK':
      return {
        ...state,
        [action.todoListId]: [
          { id: v1(), title: action.title, isDone: false },
          ...state[action.todoListId],
        ],
      };

    case 'CHANGE_TASK_STATUS':
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map((t) =>
          t.id === action.taskId ? { ...t, isDone: action.isDone } : t
        ),
      };

    case 'CHANGE_TASK_TITLE':
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map((t) =>
          t.id === action.taskId ? { ...t, title: action.title } : t
        ),
      };

    case 'ADD_TODOLIST':
      return { ...state, [action.id]: [] };

    case 'REMOVE_TODOLIST':
      const {
        [action.id]: [],
        ...rest
      } = state;
      return rest;

    default:
      return state;
  }
};
