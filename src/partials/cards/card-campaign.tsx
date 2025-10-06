import { EllipsisVertical, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { DropdownMenu2 } from '../dropdown-menu/dropdown-menu-2';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/slices/userSlice';
import { paths } from '@/components/layouts/layout-3/components/paths';

interface ICampaignItem {
  total: string;
  description: string;
}
type ICampaignItems = Array<ICampaignItem>;

interface ICampaignProps {
  logo: string;
  logoSize?: string;
  logoDark?: string;
  title: string;
  description: string;
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
  statistics: ICampaignItem[];
  progress?: {
    variant: string;
    value: number;
  };
  url: string;
}

const CardCampaign = ({
  logo,
  logoSize,
  logoDark,
  title,
  description,
  status,
  statistics,
  progress,
  url,
}: ICampaignProps) => {

  const user=useSelector(selectUser);

  const navigate=useNavigate();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Favorite clicked!');
  }

  const handleClick = () => {
    console.log('Card clicked!');
    if(user?.role as string==="traveler"){

      navigate(paths.travelerDashboard.tripDetail('1'));
    }else{
      navigate(paths.businessDashboard.lakeDetail('1'));
    }
  }

  const renderItem = (statistic: ICampaignItem, index: number) => {
    return (
      <div
        key={index}
        className="flex flex-col gap-1.5 border border-dashed border-input rounded-md px-2.5 py-2 "
      >
        <span className="text-mono text-sm leading-none font-medium">
          {statistic.total}
        </span>
        <span className="text-secondary-foreground text-xs">
          {statistic.description}
        </span>
      </div>
    );
  };

  return (
    <Card className="overflow-hidden grow justify-between  hover:border-blue-400 border transition-all duration-300 cursor-pointer" onClick={handleClick}>
      <div className="p-5 mb-5">
        <div className="flex items-center justify-between mb-5">
          <Badge size="lg" variant={status.variant} appearance="light">
            {status.label}
          </Badge>
          <DropdownMenu2
            trigger={
              <Button variant="ghost" mode="icon">
                <EllipsisVertical />
              </Button>
            }
          />
        </div>
        <div className="flex items-center justify-center h-[50px] mb-2">
          {logoDark ? (
            <>
              <img
                src={toAbsoluteUrl(`/media/brand-logos/${logo}`)}
                className={`dark:hidden size-[${logoSize}] shrink-0`}
                alt="image"
              />
              <img
                src={toAbsoluteUrl(`/media/brand-logos/${logoDark}`)}
                className={`light:hidden size-[${logoSize}] shrink-0`}
                alt="image"
              />
            </>
          ) : (
            <img
              src={toAbsoluteUrl(`/media/brand-logos/${logo}`)}
              className={`size-[${logoSize}] shrink-0`}
              alt="image"
            />
          )}
        </div>
        <div className="text-center mb-7">
          <Link
            to={url}
            className="text-lg font-medium text-mono hover:text-primary"
          >
            {title}
          </Link>
          <div className="text-sm text-secondary-foreground">{description}</div>
        </div>
        <div className="flex items-center justify-center flex-wrap gap-2 lg:gap-5">
          {statistics.map((statistic, index) => {
            return renderItem(statistic, index);
          })}
        </div>
      </div>
     {user?.role as string==="traveler" && <div className='flex justify-end pb-2 px-5' onClick={handleFavoriteClick}>
        <Heart size={24} className='text-red-500  hover:size-[28px]  transition-all hover:text-black hover:dark:text-white  p-1 rounded-full cursor-pointer' />
      </div>}
     
      <Progress
        value={progress?.value}
        indicatorClassName={progress?.variant}
        className="h-1"
      />
    </Card>
  );
};

export {
  CardCampaign,
  type ICampaignItem,
  type ICampaignItems,
  type ICampaignProps,
};
