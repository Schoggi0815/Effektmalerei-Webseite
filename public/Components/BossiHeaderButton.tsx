import React, { PropsWithChildren } from 'react';
import { Button, Icon, List, Menu } from '@mui/material';

export interface BossiHeaderButtonProps extends PropsWithChildren {
  name: string;
  href?: string;
  icon?: string;
  selected: boolean;
}

export default function BossiHeaderButton(props: BossiHeaderButtonProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (props.href) {
    return (
      <>
        <Button
          variant={props.selected ? 'outlined' : 'text'}
          href={props.href}
          className={'bossi-button'}
          startIcon={
            props.icon && (
              <Icon
                baseClassName={'material-icons-outlined'}
                className={'bossi-button-icon'}
              >
                {props.icon}
              </Icon>
            )
          }
        >
          {props.name}
        </Button>
      </>
    );
  }

  return (
    <>
      <Button
        variant={props.selected ? 'outlined' : 'text'}
        onClick={handleClick}
        className={'bossi-button'}
        startIcon={
          props.icon && (
            <Icon
              baseClassName={'material-icons-outlined'}
              className={'bossi-button-icon'}
            >
              {props.icon}
            </Icon>
          )
        }
      >
        {props.name}
      </Button>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {props.children}
      </Menu>
    </>
  );
}
