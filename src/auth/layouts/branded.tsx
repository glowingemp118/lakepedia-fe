import { Link, Outlet } from 'react-router-dom';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Card, CardContent } from '@/components/ui/card';

export function BrandedLayout() {
  return (
    <>
      <style>
        {`
          .branded-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1600/lake-rotorua-lakefront.jpg')}');
          }
          .dark .branded-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1600/lake-rotorua-lakefront.jpg')}');
          }
        `}
      </style>
      <div className="grid lg:grid-cols-2 grow">
        <div className="flex justify-center items-center md:p-8 p-3 lg:p-10 order-2 lg:order-1">
          <Card className="w-full max-w-[400px]">
            <CardContent className="md:p-6">
              <Outlet />
            </CardContent>
          </Card>
        </div>

        <div className="lg:rounded-xl lg:border lg:border-border lg:m-5 order-1 lg:order-2 bg-center xxl:bg-center xl:bg-cover bg-no-repeat branded-bg ">
          <div className="flex flex-col p-8 lg:p-16 gap-4">
            <Link to="/">
              <img
                src={toAbsoluteUrl('/media/app/mini-logo.png')}
                className="h-[28px] max-w-none"
                alt=""
              />
            </Link>

            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-semibold text-mono">
                Lakepedia
              </h3>
              <div className="text-base font-medium text-secondary-foreground">

                Lakepedia is the number one online encyclopedia of lakes. Explore beautiful lakes and lake regions and  plan your next amazing vacation. Let's Connect

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
