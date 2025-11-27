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
  Building2,
  CheckSquare,
  ClipboardCheck,
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
  {
    icon: Settings,
    path: paths.travelerDashboard.settings,
    title: 'Settings'
  }
]

export const BusinessSidebar = [
  {
    icon: BarChart3,
    path: paths.businessDashboard.root,
    title: "Dashboard",
  },
  {
    icon: Building2,
    path: paths.businessDashboard.lakes,
    title: 'Lakes'
  },
  {
    icon: BarChart3,
    path: paths.businessDashboard.stats,
    title: 'Stats'
  },
  {
    icon: Podcast,
    path: paths.businessDashboard.subscription,
    title: 'Subscription'
  },
  {
    icon: Settings,
    path: paths.businessDashboard.settings,
    title: 'Settings'
  },
];
export const AdminSidebar = [
  {
    icon: BarChart3,
    path: paths.adminDashboard.root,
    title: 'Dashboard',
  },
  {
    icon: Building2,
    path: paths.adminDashboard.businessess,
    title: 'Businesses',
  },
  {
    icon: Users,
    path: paths.adminDashboard.travelers,
    title: 'Travelers',
  },
  {
    icon: Star,
    path: paths.adminDashboard.reviews,
    title: 'Reviews',
  },

];

export interface Item {
  icon: React.ComponentType<{ className?: string }>;
  path: string | ((userName: string) => string);
  title: string;
  newTab?: boolean;
  active?: boolean;
}

export function SidebarMenu() {

  const { pathname } = useLocation();

  const user = useSelector(selectUser);

  const items: Item[] = [

    ...user?.role === "traveler" ? TravelerSidebar : [],

    ...user?.role === "business" ? BusinessSidebar : [],

    ...user?.role === "admin" ? AdminSidebar : []

  ].map((item) => ({
    ...item,
    active: 
     typeof item.path === 'string'
      ? pathname === item.path
      : item.path(user?.first_name as string + user?.last_name as string) === pathname
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
                  to={
                    typeof item.path === 'function'
                      ? item.path(user?.first_name as string + user?.last_name as string)
                      : item.path
                      || ''}
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
