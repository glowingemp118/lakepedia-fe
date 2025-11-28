import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LowerCaseWithUserId, toAbsoluteUrl } from '@/lib/helpers';
import { selectUser } from '@/store/slices/userSlice';
import { EllipsisVertical, Heart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { DropdownMenu3 } from '../dropdown-menu/dropdown-menu-3';
import { ICampaignProps } from './card-campaign';
import { paths } from '@/components/layouts/layout-3/components/paths';

const CardCampaignRow = ({
  id,
  logo,
  logoSize,
  logoDark,
  title,
  description,
  status,
  // statistics,
  url,
}: ICampaignProps) => {

  const user = useSelector(selectUser);

  const navigate = useNavigate();

  // const renderItem = (statistic: ICampaignItem, index: number) => {
  //   return (
  //     <div
  //       key={index}
  //       className="flex flex-col gap-1.5 border border-dashed border-input rounded-md px-2.5 py-2"
  //     >
  //       <span className="text-mono text-sm leading-none font-medium">
  //         {statistic.total}
  //       </span>
  //       <span className="text-secondary-foreground text-xs">
  //         {statistic.description}
  //       </span>
  //     </div>
  //   );
  // };
  const handleClick = (e: React.MouseEvent) => {
    // e.preventDefault();

      navigate(paths.businessDashboard.lakeDetail(LowerCaseWithUserId(user), id));
  }

  return (
    <Card className="p-5 lg:p-7.5 cursor-pointer" onClick={handleClick}>
      <div className="flex items-center flex-wrap justify-between gap-5">
        <div className="flex items-center gap-3.5">
          <div className="flex items-center justify-center w-[50px] ">
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
                src={toAbsoluteUrl(`/media/images/600x600/${logo}`)}
                className={`size-[${logoSize}] shrink-0 rounded-md`}
                alt="image"
              />
            )}
          </div>
          <div>
            <Link
              to={url}
              className="text-lg font-medium text-mono hover:text-primary"
            >
              {title}
            </Link>
            <div className="flex items-center text-sm text-secondary-foreground">
              {description}
            </div>
          </div>
        </div>
        <div className="flex items-center flex-wrap justify-between gap-5 lg:gap-12">
          <div className="flex items-center flex-wrap gap-2 lg:gap-5">
            {/* {statistics.map((statistic, index) => {
              return renderItem(statistic, index);
            })} */}
          </div>
          <div className="flex justify-center w-20">
            <Badge size="lg" variant={status?.variant} appearance="light">
              {status?.label}
            </Badge>
          </div>
          {user?.role as string === "traveler" && <div className='flex justify-end pb-2'>
            <Heart size={24} className='text-red-500  p-1 rounded-full cursor-pointer' />
          </div>}
          <DropdownMenu3
            id={id}
            trigger={
              <Button variant="ghost" mode="icon">
                <EllipsisVertical />
              </Button>
            }
          />
        </div>
      </div>
    </Card>
  );
};

export { CardCampaignRow };
