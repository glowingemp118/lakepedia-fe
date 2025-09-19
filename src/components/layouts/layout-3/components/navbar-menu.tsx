import { BarChart3, Building2, ChevronDown, CreditCard, Heart, ImageIcon, MessageSquare, Plane, Star } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { MENU_SIDEBAR, MENU_SIDEBAR_CUSTOM } from '@/config/layout-3.config';
import { MenuConfig } from '@/config/types';
import { cn } from '@/lib/utils';
import { useMenu } from '@/hooks/use-menu';
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
import { selectUser } from '@/store/slices/userSlice';
import { useSelector } from 'react-redux';
import { paths } from './paths';

export function NavbarMenu() {


  const { pathname } = useLocation();

  const user = useSelector(selectUser);

  const isTraveler = user?.role === "traveler";

  const isAdmin = user?.role === "admin";

  const isBusiness = user?.role === "business";


  const TravelerSidebar = [

    {
      icon: Plane,
      path: paths.travelerDashboard.trips,
      title: 'Trips'
    },
    {
      icon: ImageIcon,
      path: paths.travelerDashboard.photos,
      title: 'Photos'
    },
    {
      icon: Star,
      path: paths.travelerDashboard.reviews,
      title: 'Reviews'
    },
    {
      icon: Heart,
      path: paths.travelerDashboard.favorites,
      title: 'Favorites'
    }
  ]

  const BusinessSidebar = [

    {
      icon: Building2,
      path: paths.businessDashboard.profile,
      title: "Profile",
    },
    {
      icon: ImageIcon,
      path: paths.businessDashboard.media,
      title: "Media",
    },
    {
      icon: BarChart3,
      path: paths.businessDashboard.performance,
      title: "Performance",
    },
    {
      icon: CreditCard,
      path: paths.businessDashboard.subscriptions,
      title: "Subscriptions",
    },
    {
      icon: MessageSquare,
      path: paths.businessDashboard.chat,
      title: "Chat",
    },
  ];

  const AdminSidebar = [
    {
      icon: BarChart3,
      path: paths.adminDashboard.root,
      title: 'Dashboard',
    },
    {
      icon: Plane,
      path: "#",
      title: 'Trips',
    },
    {
      icon: ImageIcon,
      path: "#",
      title: 'Photos',
    },
    {
      icon: Star,
      path: "#",
      title: 'Reviews',
    },
    {
      icon: Heart,
      path: "#",
      title: 'Favorites',
    },
    {
      icon: ImageIcon,
      path: "#",
      title: 'Media',
    }
  ];

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
    navbarMenu= isTraveler ? { ...MENU_SIDEBAR?.[3], children: TravelerSidebar } :
      isBusiness ? { ...MENU_SIDEBAR?.[3], children: BusinessSidebar } :
        isAdmin ? { ...MENU_SIDEBAR?.[3], children: AdminSidebar } : MENU_SIDEBAR?.[3];
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
              data-active={isActive(item.path) || undefined}
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
                'flex items-center py-3.5 text-sm text-secondary-foreground px-3 text-nowrap',
                'rounded-none border-b-2 border-transparent bg-transparent!',
                'hover:text-mono hover:bg-transparent',
                'focus:text-mono focus:bg-transparent',
                'data-[active=true]:text-mono data-[active=true]:border-mono',
              )}
            >
              <Link
                to={item.path || ''}
                data-active={isActive(item.path) || undefined}
                data-here={hasActiveChild(item.children) || undefined}
              >
                {item.title}
              </Link>
            </MenubarTrigger>
          </MenubarMenu>
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
              data-active={isActive(item.path) || undefined}
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
            data-active={isActive(item.path) || undefined}
            data-here={hasActiveChild(item.children) || undefined}
          >
            <Link to={item.path || ''}>{item.title}</Link>
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
