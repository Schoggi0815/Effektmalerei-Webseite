import {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import fs from 'fs';
import React, { useMemo } from 'react';
import { ParsedUrlQuery } from 'querystring';
import BossiHeader, { PageType } from '../public/Components/BossiHeader';
import * as index from './index';
import {
  Box,
  Button,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
} from '@mui/material';
import glob from 'glob';
import BossiFooter from '../public/Components/BossiFooter';
import Head from 'next/head';
import useSelectedPageTypes from '../public/Components/useSelectedPageTypes';
import Image from 'next/image';
import Markdown from "markdown-to-jsx";
import BossiMaps from "../public/Components/BossiMaps";

export const getStaticPaths: GetStaticPaths = async () => {
  return new Promise<GetStaticPathsResult>((resolve) => {
    glob('pages/Navigation/**/*.md', (err: Error | null, files: string[]) => {
      const paths = files.map((fileName) => ({
        params: {
          slug: fileName
            .replace('.md', '')
            .replace('pages/Navigation/', '')
            .split('/'),
        },
      }));
      resolve({
        paths,
        fallback: false,
      });
    });
  });
};

interface Params extends ParsedUrlQuery {
  slug: string[];
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as Params;

  const content = fs.readFileSync(
    `pages/Navigation/${slug.join('/')}.md`,
    'utf-8'
  );

  const {
    props: { pageTypes },
  }: InferGetStaticPropsType<typeof index.getStaticProps> =
    await index.getStaticProps(context);

  return {
    props: {
      content,
      pageTypes,
      slug,
    },
  };
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Site: NextPage = ({
  content,
  pageTypes,
  slug,
  switchTheme,
  lightTheme,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const currentPageType = useSelectedPageTypes(pageTypes, slug);

  return (
    <>
      <Head>
        <title>{currentPageType?.title} | Effektmalerei</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Box
        sx={{ display: 'flex', flexDirection: 'column' }}
        className={
          'bossi-page-container ' +
          'bossi-' +
          (lightTheme ? 'light' : 'dark')
        }
      >
        <BossiHeader
          pages={pageTypes}
          lightTheme={lightTheme}
          switchTheme={switchTheme}
        />
        <Toolbar className={'bossi-toolbar-spacer'} />
        {currentPageType?.banner && (
          <img
            className={'bossi-banner-image'}
            src={currentPageType.banner}
            alt='banner image'
          />
        )}
        <Box sx={{ p: { xs: 2, md: 3 }, pt: { xs: 0, md: 3 } }} className={'bossi-markdown-wrapper'}>
          <Markdown options={{
            overrides: {
              table: {component: Table},
              thead: {component: TableHead},
              tbody: {component: TableBody},
              tr: {component: StyledTableRow},
              th: {component: StyledTableCell},
              td: {component: StyledTableCell},
              BossiMaps
            }
          }}>
            {content}
          </Markdown>
        </Box>
        <BossiFooter lightTheme={lightTheme} />
      </Box>
    </>
  );
};

export default Site;
