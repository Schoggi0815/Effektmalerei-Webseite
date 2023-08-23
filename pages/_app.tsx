import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '/styles/BossiFooter.css';
import '../styles/MainPage.css';
import '../styles/Components.css';
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material';
import '../styles/Components.css';
import { useEffect, useMemo, useState } from 'react';

function SafeHydrate(props: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <></>;
  }

  return <MyApp {...props} />;
}

function MyApp({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<boolean>(
    localStorage.getItem('mode') === 'true' || !prefersDarkMode
  );

  useEffect(() => {
    const mode = localStorage.getItem('mode');
    if (mode !== null) {
      setMode(mode === 'true');
    }
  }, []);

  const switchTheme = () => {
    localStorage.setItem('mode', (!mode).toString());
    setMode(!mode);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: '#204070',
          },
          secondary: {
            main: '#fff',
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <link
        rel='stylesheet'
        href='https://fonts.googleapis.com/icon?family=Material+Icons+Outlined'
      />
      <Component {...pageProps} switchTheme={switchTheme} lightTheme={mode} />
    </ThemeProvider>
  );
}

export default SafeHydrate;
