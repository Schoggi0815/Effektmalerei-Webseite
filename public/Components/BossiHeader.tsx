import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  List,
  SwipeableDrawer,
  Toolbar,
} from '@mui/material';
import BossiHeaderButton from './BossiHeaderButton';
import BossiListGroup from './BossiListGroup';
import BossiListButton from './BossiListButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import ToggleIcon from './ToggleIcon';

export type PageType = {
  file?: string;
  title: string;
  link?: string;
  pages?: PageType[];
  icon?: string;
  isSelected: boolean;
  banner?: string;
};

export interface BossiHeaderProps {
  pages: PageType[];
  switchTheme: () => void;
  lightTheme: boolean;
}

export default function BossiHeader(props: BossiHeaderProps) {
  const [drawerState, setDrawerState] = useState<boolean>(false);

  const handleProps = (
    pageType: PageType,
    depth: number,
    listMode: boolean,
    keyExtension?: string
  ) => {
    if (!pageType.pages) {
      if (depth === 0 && !listMode) {
        return (
          <BossiHeaderButton
            name={pageType.title}
            href={pageType.link}
            icon={pageType.icon}
            key={pageType.title + keyExtension}
            selected={pageType.isSelected}
          />
        );
      }
      return (
        <BossiListButton
          padding={depth}
          href={pageType.link}
          key={pageType.title + keyExtension}
          icon={pageType.icon}
          title={pageType.title}
          selected={pageType.isSelected}
          lightTheme={props.lightTheme}
        />
      );
    }

    if (depth === 0 && !listMode) {
      return (
        <BossiHeaderButton
          name={pageType.title}
          key={pageType.title + keyExtension}
          icon={pageType.icon}
          selected={pageType.isSelected}
        >
          {pageType.pages.map((value) =>
            handleProps(value, depth + 1, listMode, keyExtension)
          )}
        </BossiHeaderButton>
      );
    }

    return (
      <BossiListGroup
        name={pageType.title}
        padding={depth}
        key={pageType.title + keyExtension}
        icon={pageType.icon}
        selected={pageType.isSelected}
        lightTheme={props.lightTheme}
      >
        {pageType.pages.map((value) =>
          handleProps(value, depth + 1, listMode, keyExtension)
        )}
      </BossiListGroup>
    );
  };

  return (
    <>
      <AppBar
        color={'secondary'}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Container>
          <Toolbar>
            <a href={'/'}>
              <img
                src={`/bossi_logo${props.lightTheme ? '' : '_dark'}.png`}
                alt={'logo'}
                className={'bossi-logo'}
              />
            </a>
            <Box
              className={'bossi-navbar-wrapper'}
              sx={{ display: { xs: 'none', md: 'block' } }}
            >
              {props.pages.map((pageType) => handleProps(pageType, 0, false))}
            </Box>
            <Box
              className={'bossi-navbar-wrapper'}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <IconButton
                size='large'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={() => setDrawerState(!drawerState)}
                color='inherit'
              >
                <ToggleIcon
                  on={drawerState}
                  onIcon={<CloseIcon />}
                  offIcon={<MenuIcon />}
                />
              </IconButton>
            </Box>
            <Box>
              {/*<IconButton onClick={() => props.switchTheme()}>*/}
              {/*  <ToggleIcon*/}
              {/*    on={props.lightTheme}*/}
              {/*    onIcon={<LightModeOutlinedIcon />}*/}
              {/*    offIcon={<DarkModeOutlinedIcon />}*/}
              {/*  />*/}
              {/*</IconButton>*/}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <SwipeableDrawer
        anchor={'left'}
        open={drawerState}
        onClose={() => setDrawerState(false)}
        onOpen={() => setDrawerState(true)}
        sx={{
          maxWidth: '100%',
          minWidth: 300,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            mxWidth: '100%',
            minWidth: 300,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar sx={{ height: 90 }} />
        <Box sx={{ overflow: 'auto' }}>
          <List
            className={
              'bossi-header-list ' +
              'bossi-' +
              (props.lightTheme ? 'light' : 'dark')
            }
          >
            {props.pages.map((pageType) =>
              handleProps(pageType, 2, true, '_list')
            )}
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  );
}
