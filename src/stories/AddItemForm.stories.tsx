import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AddItemForm } from '../AddItemForm';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Todolist/AddItemForm',
  component: AddItemForm,
  argTypes: {
    onAddItemCallback: {
      description:
        'This callback is called when a button is clicked or Enter is pressed',
    },
  },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => (
  <AddItemForm {...args} />
);

export const AddItemFormStory = Template.bind({});
AddItemFormStory.args = {
  onAddItemCallback: action('onAddItemCallback'),
};
