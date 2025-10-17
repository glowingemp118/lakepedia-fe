import { Container } from '@/components/common/container';
import { toAbsoluteUrl } from '@/lib/helpers';
import { BadgeCheck, LucideIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { ReactNode } from 'react';
import { Link } from 'react-router';
import { Statistics } from './statistics';
import withProfile from '@/utils/withprofile';

export interface UserHeroInfo {
  email?: string;
  label?: string;
  icon?: LucideIcon | null;
}

export interface UserHeroProps {
  image?: ReactNode;
  name?: string;
  info: UserHeroInfo[];
}
interface IStatisticsItem {
  number: string;
  label: string;
}
type IStatisticsItems = Array<IStatisticsItem>;


 function UserHero({ image, name, info }: UserHeroProps) {

  const items: IStatisticsItems = [
    { number: '624', label: 'Profile Views' },
    { number: '60.7M', label: 'Profile clicks' },
    { number: '369M', label: 'Leads generated' },
  ];

 

  const { theme } = useTheme();

  const buildInfo = (info: UserHeroInfo[]) => {

    return info.map((item, index) => {

      return (

        <div className="flex gap-1.25 items-center" key={`info-${index}`}>
          {item.icon && (
            <item.icon size={16} className="text-muted-foreground text-sm" />
          )}
          {item.email ? (
            <Link
              to={item.email}
              target="_blank"
              className="text-secondary-foreground font-medium hover:text-primary"
              rel="noreferrer"
            >
              {item.email}
            </Link>
          ) : (
            <span className="text-secondary-foreground font-medium">
              {item.label}
            </span>
          )}
        </div>
      );
    });
  };

  return (
    <div
      className="bg-center bg-cover bg-no-repeat hero-bg"
      style={{
        backgroundImage:
          theme === 'dark'
            ? `url('${toAbsoluteUrl('/media/images/2600x1200/bg-1-dark.png')}')`
            : `url('${toAbsoluteUrl('/media/images/2600x1200/bg-1.png')}')`,
      }}
    >
      <Container>
        <div className="flex flex-col items-center gap-2 lg:gap-3.5 py-4 lg:pt-5 lg:pb-10">
          {image}
          <div className="flex items-center gap-1.5">
            <div className="text-lg leading-5 font-semibold text-mono">
              {name}
            </div>
             <BadgeCheck color='blue' size={16} />
          </div>
          <div className="flex flex-wrap justify-center gap-1 lg:gap-4.5 text-sm">
            {buildInfo(info)}
          </div>
        </div>
        <div className="col-span-1 lg:col-span-3">
          <Statistics items={items} />
        </div>
      </Container>
    </div>
  );
}


export const BusinessHeroWithProfile = withProfile(UserHero);