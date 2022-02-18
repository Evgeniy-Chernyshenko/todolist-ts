import React from 'react';
// import { Button } from "./Button";
import { OnClickFilterButtonCallbackType } from './TodoList';
import { FilterValueType } from './App';
import { ButtonGroup, Button } from '@mui/material';

type ButtonsPanelPropsType = {
  filterValue: FilterValueType;
  onClickFilterButtonCallback: OnClickFilterButtonCallbackType;
};

const activeButtonParams = {
  variant: 'contained',
  color: 'error',
} as const;

export const ButtonsPanel = (props: ButtonsPanelPropsType) => {
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
};
