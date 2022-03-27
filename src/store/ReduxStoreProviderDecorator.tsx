import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { v1 } from 'uuid';
import { store, RootStateType } from './state';
import { tasksReducer } from './tasks-reducer';
import { todoListsReducer } from './todolists-reducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListsReducer,
});

const initialGlobalState: RootStateType = {
  todoLists: [
    { id: 'todolistId1', title: 'What to learn', filterValue: 'all' },
    { id: 'todolistId2', title: 'What to buy', filterValue: 'all' },
  ],
  tasks: {
    ['todolistId1']: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
    ],
    ['todolistId2']: [
      { id: v1(), title: 'Milk', isDone: true },
      { id: v1(), title: 'React Book', isDone: true },
    ],
  },
};

export const storyBookStore = createStore(
  rootReducer,
  initialGlobalState as RootStateType
);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
