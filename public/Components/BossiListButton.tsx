import React, { PropsWithChildren } from 'react';
import { Icon, ListItemButton, ListItemText } from '@mui/material';

interface BossiListButtonProps {
  padding: number;
  href?: string;
  icon?: string;
  title: string;
  selected: boolean;
  lightTheme: boolean;
}

export default function BossiListButton(props: BossiListButtonProps) {
  return (
    <ListItemButton
      sx={{ pl: props.padding }}
      href={props.href || ''}
      selected={props.selected}
      className={
        'bossi-header-list ' +
        'bossi-' +
        (props.lightTheme ? 'light' : 'dark')
      }
    >
      {props.icon && (
        <Icon
          baseClassName={'material-icons-outlined'}
          className={'bossi-list-icon'}
        >
          {props.icon}
        </Icon>
      )}
      <ListItemText primary={props.title} />
    </ListItemButton>
  );
}
