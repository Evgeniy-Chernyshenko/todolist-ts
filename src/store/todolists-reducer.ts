import { v1 } from 'uuid';

export type FilterValueType = 'all' | 'active' | 'completed';

export type TodoListType = {
  id: string;
  title: string;
  filterValue: FilterValueType;
};

export type TodoListsType = TodoListType[];

type ActionCreatorsType = typeof todoListsAC;
type ActionCreatorsTypeKeys = keyof ActionCreatorsType;
type ActionType = ReturnType<ActionCreatorsType[ActionCreatorsTypeKeys]>;

// export const todoListId1 = v1();
// export const todoListId2 = v1();

const initialState: TodoListsType = [
  // { id: todoListId1, title: 'What to learn', filterValue: 'all' },
  // { id: todoListId2, title: 'What to buy', filterValue: 'all' },
];

export const todoListsReducer = (
  state = initialState,
  action: ActionType
): TodoListsType => {
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

export const todoListsAC = {
  removeTodoList: (id: string) =>
    ({
      type: 'REMOVE_TODOLIST',
      id,
    } as const),
  addTodoList: (title: string) =>
    ({
      type: 'ADD_TODOLIST',
      id: v1(),
      title,
    } as const),
  changeTodoListFilterValue: (id: string, value: FilterValueType) =>
    ({
      type: 'CHANGE_TODOLIST_FILTER_VALUE',
      id,
      value,
    } as const),
  changeTodoListTitle: (id: string, title: string) =>
    ({
      type: 'CHANGE_TODOLIST_TITLE',
      id,
      title,
    } as const),
};
