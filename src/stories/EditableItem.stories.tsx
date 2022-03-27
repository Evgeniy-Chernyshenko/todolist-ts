import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import { EditableItem } from '../EditableItem';

export default {
  title: 'Todolist/EditableItem',
  component: EditableItem,
  argTypes: {
    title: {
      defaultValue: 'Test title 1',
      description: 'This is value of EditableItem',
    },
    onChangeItemTitleCallback: {
      description: 'OnChangeItemTitleCallback callback handler',
    },
  },
  args: {
    title: 'Test title 1',
  },
} as ComponentMeta<typeof EditableItem>;

const Template: ComponentStory<typeof EditableItem> = (args) => (
  <EditableItem {...args} />
);

export const EditableItemStory = Template.bind({});
EditableItemStory.args = {
  onChangeItemTitleCallback: action('onChangeItemTitleCallback'),
};
