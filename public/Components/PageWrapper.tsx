import React from 'react';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import BossiHeader from './BossiHeader';
import BossiFooter from './BossiFooter';
import { Box, Toolbar } from '@mui/material';
import { useRouter } from 'next/router';
import useSelectedPageTypes from '../../public/Components/useSelectedPageTypes';
import { getStaticProps } from '../../pages';

export { getStaticProps };

export default function PageWrapper(Component: React.ComponentType) {
  const wrappedComponent = (
    props: InferGetStaticPropsType<typeof getStaticProps>
  ) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
      // eslint-disable-next-line react-hooks/rules-of-hooks
    useSelectedPageTypes(
      props.pageTypes,
      router.pathname.substring(1).split('/')
    );

    return (
      <>
        <Head>
          <title>Learn English in England</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Box
          sx={{ display: 'flex', flexDirection: 'column' }}
          className={
            'bossi-page-container ' +
            'bossi-' +
            (props.lightTheme ? 'light' : 'dark')
          }
        >
          <BossiHeader
            pages={props.pageTypes}
            switchTheme={props.switchTheme}
            lightTheme={props.lightTheme}
          />
          <Toolbar className={'bossi-toolbar-spacer'} />
          <Box sx={{ p: 3 }} className={'bossi-markdown-wrapper'}>
            <Component {...props} />
          </Box>

          <BossiFooter lightTheme={props.lightTheme} />
        </Box>
      </>
    );
  };

  return wrappedComponent;
}
