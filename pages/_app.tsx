import '../styles/resets.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@components/layouts/main.layout';
import { Context } from '@utils/Context';
import useDarkMode from '@utils/customHooks/useDarkMode';

function MyApp({ Component, pageProps }: AppProps) {
  const [enabled, setEnabled] = useDarkMode();

  return (
    <Context.Provider value={{ enabled, setEnabled }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Context.Provider>
  );
}

export default MyApp;
