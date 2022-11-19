import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import BossiHeader, { PageType } from '../public/Components/BossiHeader';
import BossiFooter from '../public/Components/BossiFooter';
import MainPage from '../public/Components/MainPage';
import fs from 'fs';
import yaml from 'yaml';

function setPageLink(pageType: PageType, currentLink: string) {
  if (pageType.pages) {
    pageType.pages.forEach((value) => {
      setPageLink(value, currentLink + '/' + pageType.file);
    });
    return;
  }

  if (!pageType.link) {
    pageType.link = currentLink + '/' + pageType.file;
  }
}

export const getStaticProps: GetStaticProps = async () => {
  const pageTypes: PageType[] = yaml.parse(
    fs.readFileSync('pages/navigation-config.yaml', 'utf8')
  );

  pageTypes.forEach((pageType) => {
    setPageLink(pageType, '');
  });

  return {
    props: {
      pageTypes,
    },
  };
};

const Home: NextPage = ({
  pageTypes,
  switchTheme,
  lightTheme,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const home = pageTypes.filter((pageType: PageType) => pageType.file === '/');
  if (home.length > 0) {
    home[0].isSelected = true;
  }

  return (
    <div className={'bossi-' + (lightTheme ? 'light' : 'dark')}>
      <Head>
        <title>Effektmalerei Bossi</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <BossiHeader
        pages={pageTypes}
        switchTheme={switchTheme}
        lightTheme={lightTheme}
      />

      <MainPage/>

      <BossiFooter lightTheme={lightTheme} />
    </div>
  );
};

export default Home;
