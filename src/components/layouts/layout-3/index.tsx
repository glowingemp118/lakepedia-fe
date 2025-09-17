import { Helmet } from 'react-helmet-async';
import { LayoutProvider } from '@/components/layouts/layout-1/components/context';
import { Main } from './components/main';

export function Layout3() {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <LayoutProvider>
        <Main />
      </LayoutProvider>
    </>
  );
}
