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
  ClipboardCheck,
  CreditCard,
  Heart,
  ImageIcon,
  Plane,
  Podcast,
  Settings,
  Star,
  Users
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { paths } from './paths';

export const TravelerSidebar = [

  {
    icon: BarChart3,
    path: paths.travelerDashboard.root,
    title: 'Dashboard',
  },
  {
    icon: Settings,
    path: paths.travelerDashboard.settings,
    title: 'Settings'
  },
  {
    icon: Bell,
    path: paths.travelerDashboard.activity,
    title: 'Activity'
  },
  {
    icon: Plane,
    path: paths.travelerDashboard.trips,
    title: 'Trips'
  },
  {
    icon: CheckSquare,
    path: paths.travelerDashboard.saved,
    title: 'Saved'
  },
  {
    icon: ClipboardCheck,
    path: paths.travelerDashboard.todo,
    title: 'To-Do'

  },
  // {
  //   icon: Users,
  //   path: paths.travelerDashboard.editProfile,
  //   title: 'Edit Profile'
  // }
]

export const BusinessSidebar = [
  {
    icon: BarChart3,
    path: paths.businessDashboard.root,
    title: "Dashboard",
  },
  {
    icon: Settings,
    path: paths.businessDashboard.settings,
    title: 'Settings'
  },
  {
    icon: Bell,
    path: paths.businessDashboard.activity,
    title: 'Activity'
  },
  {
    icon: Building2,
    path: paths.businessDashboard.lakes,
    title: 'Lakes'
  },
  // {
  //   icon: Settings,
  //   path: paths.businessDashboard.editBusiness,
  //   title: 'Edit Business'
  // },
  {
    icon: BarChart3,
    path: paths.businessDashboard.stats,
    title: 'Stats'
  },
  {
    icon: Podcast,
    path: paths.businessDashboard.subscription,
    title: 'Subscription'
  }
];
export const AdminSidebar = [
  {
    icon: BarChart3,
    path: paths.adminDashboard.root,
    title: 'Dashboard',
  },
  {
    icon:Building2 ,
    path: paths.adminDashboard.businessess,
    title: 'Businesses',
  },
  {
    icon: Users,
    path: paths.adminDashboard.users,
    title: 'Users',
  },
  // {
  //   icon: Plane,
  //   path: "#",
  //   title: 'Trips',
  // },
  // {
  //   icon: ImageIcon,
  //   path: "#",
  //   title: 'Photos',
  // },
  // {
  //   icon: Star,
  //   path: "#",
  //   title: 'Reviews',
  // },
  // {
  //   icon: Heart,
  //   path: "#",
  //   title: 'Favorites',
  // },
  // {
  //   icon: ImageIcon,
  //   path: "#",
  //   title: 'Media',
  // }
];

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
