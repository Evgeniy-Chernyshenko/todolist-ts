import React, { memo } from 'react';
import { OnClickFilterButtonCallbackType } from './TodoList';
import { ButtonGroup, Button } from '@mui/material';
import { FilterValueType } from './store/todolists-reducer';

type ButtonsPanelPropsType = {
  filterValue: FilterValueType;
  onClickFilterButtonCallback: OnClickFilterButtonCallbackType;
};

const activeButtonParams = {
  variant: 'contained',
  color: 'error',
} as const;

export const ButtonsPanel = memo((props: ButtonsPanelPropsType) => {
  console.log('render ButtonsPanel');

  return (
    <ButtonGroup fullWidth>
      <Button
        {...(props.filterValue === 'all' && activeButtonParams)}
        onClick={props.onClickFilterButtonCallback('all')}
      >
        All
      </Button>
      <Button
        {...(props.filterValue === 'active' && activeButtonParams)}
        onClick={props.onClickFilterButtonCallback('active')}
      >
        Active
      </Button>
      <Button
        {...(props.filterValue === 'completed' && activeButtonParams)}
        onClick={props.onClickFilterButtonCallback('completed')}
      >
        Completed
      </Button>
    </ButtonGroup>
  );
});
