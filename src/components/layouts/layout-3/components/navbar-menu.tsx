
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { MENU_SIDEBAR, MENU_SIDEBAR_CUSTOM } from '@/config/layout-3.config';
import { MenuConfig } from '@/config/types';
import { useMenu } from '@/hooks/use-menu';
import { cn } from '@/lib/utils';
import { selectUser } from '@/store/slices/userSlice';
import { ChevronDown } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { TravelerSidebar as TravelerMemu, BusinessSidebar as BusinessMemu, AdminSidebar as AdminMemu } from './sidebar-menu';

export function NavbarMenu() {


  const { pathname } = useLocation();

  const user = useSelector(selectUser);

  const TravelerSidebar = TravelerMemu.map((item) => item.title === "Dashboard" ? {
    ...item,
    title: "Activity"
  } :
    item);

  const BusinessSidebar = BusinessMemu.map((item) => item.title === "Dashboard" ? {
    ...item,
    title: "Activity"
  } :
    item);


  const AdminSidebar = AdminMemu.map((item) => item.title === "Dashboard" ? {
    ...item,
    title: "Overview"
  } :
    item);


  let navbarMenu;

  if (pathname.includes('/layout-3')) {
    navbarMenu = MENU_SIDEBAR?.[2];
  } else if (pathname.includes('/layout-3')) {
    navbarMenu = MENU_SIDEBAR?.[4];
  } else if (pathname.includes('/layout-3')) {
    navbarMenu = MENU_SIDEBAR_CUSTOM?.[0];
  } else if (pathname.includes('/layout-3')) {
    navbarMenu = MENU_SIDEBAR?.[5];
  } else {
    // navbarMenu = MENU_SIDEBAR?.[3];
    navbarMenu = user?.role === "traveler" ? { ...MENU_SIDEBAR?.[3], children: TravelerSidebar } :
      user?.role === "business" ? { ...MENU_SIDEBAR?.[3], children: BusinessSidebar } :
        user?.role === "admin" ? { ...MENU_SIDEBAR?.[3], children: AdminSidebar } : MENU_SIDEBAR?.[3];
  }


  const { isActive, hasActiveChild } = useMenu(pathname);



  const buildMenu = (items: MenuConfig) => {
    return items.map((item, index) => {

      if (item.children) {
        return (
          <MenubarMenu key={index}>
            <MenubarTrigger
              className={cn(
                'flex items-center gap-1 px-0 py-3.5 text-sm text-secondary-foreground text-nowrap',
                'rounded-none border-b-2 border-transparent bg-transparent!',
                'hover:text-mono hover:bg-transparent',
                'focus:text-mono focus:bg-transparent',
                'data-[state=open]:bg-transparent data-[state=open]:text-mono',
                'data-[here=true]:text-mono data-[here=true]:border-mono',
              )}
              data-active={isActive(
                typeof item.path === 'function'
                  ? item.path(user?.first_name as string + user?.last_name as string)
                  : item.path
                  || ''
              ) || undefined}
              data-here={hasActiveChild(item.children) || undefined}
            >
              {item.title}
              <ChevronDown className="ms-auto size-3.5!" />
            </MenubarTrigger>
            <MenubarContent className="min-w-[175px]" sideOffset={0}>
              {buildSubMenu(item.children)}
            </MenubarContent>
          </MenubarMenu>
        );
      } else {
        return (
          <MenubarMenu key={index}>
            <MenubarTrigger
              asChild
              className={cn(
                'flex items-center py-3.5 text-sm text-secondary-foreground px-3 text-nowrap border border-red-500',
                'rounded-none border-b-2 border-transparent bg-transparent!',
                'hover:text-mono hover:bg-transparent',
                'focus:text-mono focus:bg-transparent',
                'data-[active=true]:text-mono data-[active=true]:border-mono transition-all',
              )}
            >
              <Link
                to={
                  typeof item.path === 'function'
                    ? item.path(user?.first_name as string + user?.last_name as string)
                    : item.path
                    || ''}
                data-active={isActive(
                  typeof item.path === 'function'
                    ? item.path(user?.first_name as string + user?.last_name as string)
                    : item.path
                    || ''
                ) || undefined}
                data-here={hasActiveChild(item.children) || undefined}
                className={`${isActive(
                  typeof item.path === 'function'
                    ? item.path(user?.first_name as string + user?.last_name as string)
                    : item.path
                    || ''
                ) ? "!border-b-3 !border-b-primary font-bold text-primary text-[16px] transition-all " : ''}`}
              >
                {item.title}
              </Link>
            </MenubarTrigger>
          </MenubarMenu >
        );
      }
    });
  };

  const buildSubMenu = (items: MenuConfig) => {
    return items.map((item, index) => {
      if (item.children) {
        return (
          <MenubarSub key={index}>
            <MenubarSubTrigger
              data-active={isActive(
                typeof item.path === 'function'
                  ? item.path(user?.first_name as string + user?.last_name as string)
                  : item.path
                  || ''
              ) || undefined}
              data-here={hasActiveChild(item.children) || undefined}
            >
              <span>{item.title}</span>
            </MenubarSubTrigger>
            <MenubarSubContent className="min-w-[175px]">
              {buildSubMenu(item.children)}
            </MenubarSubContent>
          </MenubarSub>
        );
      } else {
        return (
          <MenubarItem
            key={index}
            asChild
            data-active={isActive(
              typeof item.path === 'function'
                ? item.path(user?.first_name as string + user?.last_name as string)
                : item.path
                || ''
            ) || undefined}
            data-here={hasActiveChild(item.children) || undefined}
          >
            <Link to={
              typeof item.path === 'function'
                ? item.path(user?.first_name as string + user?.last_name as string)
                : item.path
              || ''}>{item.title}</Link>
          </MenubarItem>
        );
      }
    });
  };

  return (
    <div className="grid">
      <div className="kt-scrollable-x-auto flex items-stretch">
        <Menubar className="space-x-0 flex items-stretch border-none bg-transparent gap-5 p-0 h-auto">
          {buildMenu(navbarMenu.children as MenuConfig)}
        </Menubar>
      </div>
    </div>
  );
}
