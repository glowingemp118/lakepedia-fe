import { Fragment, JSX } from 'react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Card, CardContent } from '@/components/ui/card';

interface IChannelStatsItem {
  logo: string;
  logoDark?: string;
  info: string;
  desc: string;
  path: string;
  icon: JSX.Element;
}
type IChannelStatsItems = Array<IChannelStatsItem>;

const ChannelStats = () => {
const items: IChannelStatsItems = [
  { logo: 'review.svg', info: '9.3k', desc: 'Reviews', path: '' ,icon:<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
</svg>
},
  { logo: 'mouse-click.svg', info: '24k', desc: 'Clicks', path: '' ,icon:<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2v20m-6-6l12-12m0 12L6 6"/>
</svg>
},
  { logo: 'star.svg', info: '4.8', desc: 'Average rating', path: '',icon:<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="gold" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9 12 2"/>
</svg>
 },
];

  const renderItem = (item: IChannelStatsItem, index: number) => {
    return (
      <Card key={index}>
        <CardContent className="p-0 flex flex-col justify-between gap-6 h-full bg-cover rtl:bg-[left_top_-1.7rem] bg-[right_top_-1.7rem] bg-no-repeat channel-stats-bg">
          {/* {item.logoDark ? (
            <>
              <img
                src={toAbsoluteUrl(`/media/brand-logos/${item.logo}`)}
                className="dark:hidden w-7 mt-4 ms-5"
                alt="image"
              />
              <img
                src={toAbsoluteUrl(`/media/brand-logos/${item.logoDark}`)}
                className="light:hidden w-7 mt-4 ms-5"
                alt="image"
              />
            </>
          ) : (
            <img
              src={toAbsoluteUrl(`/media/brand-logos/${item.logo}`)}
              className="w-7 mt-4 ms-5"
              alt="image"
            />
          )} */}
          <div className="p-5 pt-4">
            {item.icon}
          </div>
          <div className="flex flex-col gap-1 pb-4 px-5">
            <span className="text-3xl font-semibold text-mono">
              {item.info}
            </span>
            <span className="text-sm font-normal text-muted-forehead">
              {item.desc}
            </span>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Fragment>
      <style>
        {`
          .channel-stats-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1600/bg-3.png')}');
          }
          .dark .channel-stats-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1600/bg-3-dark.png')}');
          }
        `}
      </style>

      {items.map((item, index) => {
        return renderItem(item, index);
      })}
    </Fragment>
  );
};

export { ChannelStats, type IChannelStatsItem, type IChannelStatsItems };
