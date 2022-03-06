import { v1 } from 'uuid';

type FilterValueType = 'all' | 'active' | 'completed';

type TodolistType = {
  id: string;
  title: string;
  filterValue: FilterValueType;
};

export type TodolistsType = TodolistType[];

type ActionCreatorsType = typeof todolistsAC;
type ActionCreatorsTypeKeys = keyof ActionCreatorsType;
type ActionType = ReturnType<ActionCreatorsType[ActionCreatorsTypeKeys]>;

export const todolistsAC = {
  removeTodolist: (id: string) =>
    ({
      type: 'REMOVE_TODOLIST',
      id,
    } as const),
  addTodolist: (title: string) =>
    ({
      type: 'ADD_TODOLIST',
      id: v1(),
      title,
    } as const),
  changeTodolistFilterValue: (id: string, value: FilterValueType) =>
    ({
      type: 'CHANGE_TODOLIST_FILTER_VALUE',
      id,
      value,
    } as const),
  changeTodolistTitle: (id: string, title: string) =>
    ({
      type: 'CHANGE_TODOLIST_TITLE',
      id,
      title,
    } as const),
};

export const todolistsReducer = (
  state: TodolistsType,
  action: ActionType
): TodolistsType => {
  switch (action.type) {
    case 'REMOVE_TODOLIST':
      return state.filter((tl) => tl.id !== action.id);

    case 'ADD_TODOLIST':
      return [
        { id: action.id, title: action.title, filterValue: 'all' },
        ...state,
      ];

    case 'CHANGE_TODOLIST_FILTER_VALUE':
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, filterValue: action.value } : tl
      );

    case 'CHANGE_TODOLIST_TITLE':
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, title: action.title } : tl
      );

    default:
      return state;
  }
};
