import React, { PropsWithChildren } from 'react';
import {
  Collapse,
  Icon,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export interface BossiListGroupProps extends PropsWithChildren {
  name: string;
  padding: number;
  icon?: string;
  selected: boolean;
  lightTheme: boolean;
}

export default function BossiListGroup(props: BossiListGroupProps) {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={{ pl: props.padding }}
        className={
          'bossi-expand ' +
          'bossi-header-list ' +
          'bossi-' +
          (props.lightTheme ? 'light' : 'dark')
        }
        selected={props.selected}
      >
        {props.icon && (
          <Icon
            baseClassName={'material-icons-outlined'}
            className={'bossi-list-icon'}
          >
            {props.icon}
          </Icon>
        )}
        <ListItemText primary={props.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {props.children}
        </List>
      </Collapse>
    </>
  );
}
