import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { selectUser } from '@/store/slices/userSlice';
import {
  BarChart3,
  Bell,
  Building2,
  CheckSquare,
  Code,
  CreditCard,
  Heart,
  HelpCircle,
  ImageIcon,
  MessageSquare,
  Plane,
  Settings,
  Shield,
  Star,
  UserCircle,
  Users
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { paths } from './paths';

export interface Item {
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  title: string;
  newTab?: boolean;
  active?: boolean;
}

export function SidebarMenu() {

  const { pathname } = useLocation();

  const user = useSelector(selectUser);

  const isTraveler = user?.role === "traveler";

  const isAdmin = user?.role === "admin";

  const isBusiness = user?.role === "business";


  const TravelerSidebar = [

    {
      icon: BarChart3,
      path: paths.travelerDashboard.root,
      title: 'Dashboard',
    },
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
      icon: BarChart3,
      path: paths.businessDashboard.root,
      title: "Dashboard",
    },
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

  const items: Item[] = [

    ...isTraveler ? TravelerSidebar : [],
    ...isBusiness ? BusinessSidebar : [],
    ...isAdmin ? AdminSidebar : []
  ].map((item) => ({
    ...item,
    active: item.path === pathname
  }));

  return (
    <TooltipProvider>
      <div className="flex flex-col grow items-center py-3.5 lg:py-0 gap-2.5">
        {items.map((item, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                shape="circle"
                mode="icon"
                {...(item.active ? { 'data-state': 'open' } : {})}
                className={cn(
                  'data-[state=open]:bg-background data-[state=open]:border data-[state=open]:border-input data-[state=open]:text-primary',
                  'hover:bg-background hover:border hover:border-input hover:text-primary',
                )}
              >
                <Link
                  to={item.path || ''}
                  {...(item.newTab
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  <item.icon className="size-4.5!" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">{item.title}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
