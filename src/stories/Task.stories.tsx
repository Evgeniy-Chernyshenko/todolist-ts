import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import { Task } from '../Task';
import { ReduxStoreProviderDecorator } from '../store/ReduxStoreProviderDecorator';
import { useSelector } from 'react-redux';
import { RootStateType } from '../store/state';
import { TaskType } from '../store/tasks-reducer';

export default {
  title: 'Todolist/Task',
  component: Task,
  argTypes: {},
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Task>;

const baseArgs = {
  task: {
    id: '1',
    title: 'Task 1 title',
    isDone: true,
  },
  isLast: true,
  todoListId: '1',
};

const TaskWithRedux = () => {
  const task = useSelector<RootStateType, TaskType>(
    (state) => state.tasks['todolistId1'][0]
  );

  return <Task isLast={true} task={task} todoListId="todolistId1" />;
};

const Template: ComponentStory<typeof Task> = () => <TaskWithRedux />;

export const TaskStory = Template.bind({});
