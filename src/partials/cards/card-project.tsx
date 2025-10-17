import { Link, useNavigate } from 'react-router';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AvatarGroup } from '../common/avatar-group';
import { Heart } from 'lucide-react';
import { paths } from '@/components/layouts/layout-3/components/paths';

interface IProjectProps {
  logo: string;
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
  status: {
    variant?:
    | 'primary'
    | 'destructive'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | null
    | undefined;
    label: string;
  };
  progress: {
    variant: string;
    value: number;
  };
  team: {
    size?: string;
    group: Array<{ filename?: string; variant?: string; fallback?: string }>;
    more?: {
      variant?: string;
      number?: number;
    };
  };
}

const CardProject = ({
  logo,
  name,
  description,
  startDate,
  endDate,
  status,
  progress,
  team,
}: IProjectProps) => {

  const navigate = useNavigate();
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle the favorite click logic here
    //console.log('Favorite clicked!');
  }
  return (
    <Card className="p-7.5 hover:border-blue-400 border transition-all duration-300 cursor-pointer"
      onClick={() => { navigate(paths.travelerDashboard.tripDetail("1")) }}>
     
      <div className="flex items-center justify-between mb-3 lg:mb-6">
        <div className="flex items-center justify-center size-[50px] rounded-lg bg-accent/60">
          <img
            src={toAbsoluteUrl(`/media/brand-logos/${logo}`)}
            className=""
            alt="image"
          />
        </div>
        <Badge size="lg" variant={status.variant} appearance="light">
          {status.label}
        </Badge>
      </div>
      <div className="flex flex-col mb-3 lg:mb-6">
        <Link
          to="#"
          className="text-lg font-media/brand text-mono hover:text-primary-active mb-px"
        >
          {name}
        </Link>
        <span className="text-sm text-secondary-foreground">{description}</span>
      </div>
      <div className="flex items-center gap-5 mb-3.5 lg:mb-7">
        <span className="text-sm text-secondary-foreground">
          Start:{' '}
          <span className="text-sm font-medium text-foreground">
            {startDate}
          </span>
        </span>
        <span className="text-sm text-secondary-foreground">
          End:{' '}
          <span className="text-sm font-medium text-foreground">{endDate}</span>
        </span>
      </div>
      <Progress
        value={progress?.value}
        indicatorClassName={progress?.variant}
        className="h-1.5 mb-4 lg:mb-8"
      />
     <div className='flex justify-between items-center'>
       <AvatarGroup group={team.group} size={team.size} more={team.more} />
       <div className='flex justify-end' onClick={handleFavoriteClick}>
        <Heart size={24} className='hover:text-red-500 hover:size-[28px] transition-all p-1 rounded-full cursor-pointer' />
      </div>
     </div>
    </Card>
  );
};

export { CardProject, type IProjectProps };
