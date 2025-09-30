import { MENU_SIDEBAR } from '@/config/layout-3.config';
import { NavbarMenu } from '@/partials/navbar/navbar-menu';

const PageMenu = () => {
  const accountMenuConfig = MENU_SIDEBAR?.['2']?.children;

  if (accountMenuConfig) {
    return <NavbarMenu items={accountMenuConfig} />;
  } else {
    return <></>;
  }
};

export { PageMenu };
