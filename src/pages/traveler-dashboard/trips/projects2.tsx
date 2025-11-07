
import { paths } from '@/components/layouts/layout-3/components/paths';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useBoolean } from '@/hooks/use-boolean';
import { formatDate } from '@/lib/helpers';
import { DropdownMenu2 } from '@/partials/dropdown-menu/dropdown-menu-2';
import { EllipsisVertical, Heart, LayoutGrid, List, Plus } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import QuickAddEditTripModal from './quick-add-edit-trip-modal';


interface TripItem {
  id: string;
  name: string;
  type: string;
  lakes: [{ lake: string }];
  groupSize: number;
  start_date: string;
  end_date: string;
  description: string;
  isPrivate: boolean;
  progress: {
    variant: string;
    value: number;
  };
  number_of_people: number;
  // team: {
  //   size?: string;
  //   group: Array<{ path?: string; variant?: string; fallback?: string }>;

  //   more?: {
  //     variant?: string;
  //     number?: number;
  //   };
  // };
  status: string,
  // status: {
  //   label: string;
  //   variant: 'primary' | 'secondary' | 'success' | 'warning' | 'info';
  // };
}

type ITrips2Items = Array<TripItem>;
interface PageProps {
  trips: any;
}
const Projects2: FC<PageProps> = ({ trips }) => {

  const { state } = useLocation();

  const navigate = useNavigate();

  const open = useBoolean();

  const [activeView, setActiveView] = useState<'cards' | 'list'>('cards');


  useEffect(() => {
    if (state && state.from === 'todo') {
      open.onTrue();
      navigate(window.location.pathname, { replace: true });
    }
  }, [state]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle the favorite click logic here
  }

  const renderCard = (trip: TripItem) => (
    <Card
      key={trip.id}
      className="p-7.5 hover:border-blue-400 border transition-all duration-300 cursor-pointer"
      onClick={() => { navigate(paths.travelerDashboard.tripDetail(trip.id)) }}
    >
      <div className="flex flex-col gap-2">
        <div className='flex justify-between items-center'>
          <Badge appearance={"light"} className='capitalize' variant={
            (trip?.status === 'in_progress' && 'primary') ||
            (trip?.status === 'completed' && 'success') ||
            (trip?.status === 'upcoming' && 'warning') ||
            (trip?.status === 'planned' && 'destructive') ||
            "secondary"
          }>{trip.status}</Badge>
          <DropdownMenu2
            id={trip.id}
            trip={trip}
            trigger={
              <Button variant="ghost" mode="icon">
                <EllipsisVertical />
              </Button>
            }
          />
        </div>
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-lg text-gray-900 dark:text-white">{trip.name}</h4>

        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{trip.description}</p>
        <div className="text-sm text-gray-500 mt-2 space-y-1">
          <p className='flex gap-2'><strong>Lakes:</strong> {trip?.lakes.length > 0 ? <div className='flex flex-wrap gap-1'>
            {trip.lakes?.map((lake: any) => {
              return <Badge appearance={"light"} className='capitalize'  >{lake.lake}</Badge>
            })}
          </div> : "No lakes specified"
          }</p>
          <p className='capitalize'><strong>Type:</strong> {trip.type}</p>
          <p><strong>Dates:</strong> {formatDate(trip.start_date)} → {formatDate(trip.end_date)}</p>
        </div>
        {trip.isPrivate && (
          <p className="text-xs text-red-500 font-medium mt-1">Private Trip</p>
        )}
      </div>

      {/* <Progress
        // value={trip.progress.value}
        value={100}
        indicatorClassName={
        (trip?.status === 'in_progress' && 'primary') ||
            (trip?.status === 'completed' && 'success') ||
            (trip?.status === 'upcoming' && 'warning') ||
            (trip?.status === 'planned' && 'destructive') || 
            "secondary"
        }
        className="h-1.5 mb-4 mt-4"
      /> */}
      <div className='flex justify-end items-center'>
        {/* <AvatarGroup
          group={trip.number_of_people > 0 ?
            [
              { filename: '300-12.png' },
              { filename: '300-20.png' },
              { filename: '300-3.png' },
            ]
            :
            []
          }
          size={'size-[30px]'}
          more={trip.number_of_people}
        /> */}
        <div className='flex justify-end' onClick={handleFavoriteClick}>
          <Heart size={24} className='hover:text-red-500 hover:size-[28px] transition-all p-1 rounded-full cursor-pointer' />
        </div>
      </div>
    </Card >
  );

  const renderRow = (trip: TripItem) => (
    <div
      key={trip.id}
      className="flex flex-col lg:flex-row lg:items-center justify-between rounded-xl p-5 hover:border-blue-400 border transition-all duration-300 cursor-pointer"
      onClick={() => navigate(paths.travelerDashboard.tripDetail(trip.id))}
    >
      {/* Left Side — Trip Info */}
      <div className="flex flex-col gap-1 w-full lg:w-2/3">
        <div className="flex items-center gap-3 flex-wrap">
          <h4 className="font-semibold text-lg text-gray-900 dark:text-white">{trip.name}</h4>
          {trip.isPrivate && (
            <Badge variant="destructive" className="text-xs">
              Private
            </Badge>
          )}
          <Badge appearance={"light"} className='capitalize' variant={
            (trip?.status === 'in_progress' && 'primary') ||
            (trip?.status === 'completed' && 'success') ||
            (trip?.status === 'upcoming' && 'warning') ||
            (trip?.status === 'planned' && 'destructive') ||
            "secondary"
          }>{trip.status}</Badge>
        </div>

        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{trip.description}</p>

        <div className="text-sm text-gray-500 mt-2 grid grid-cols-1 sm:grid-cols-2 gap-y-1">
          <p className='capitalize'>
            <strong>Type:</strong> {trip.type}
          </p>
          {/* <p>
            <strong>Lake:</strong> {trip?.lakes?.length > 0 ? trip.lakes?.map((lake: any) => lake.lake).join(", ") : "No lakes specified"}
          </p> */}
          <p className='flex gap-2'><strong>Lakes:</strong> {trip?.lakes.length > 0 ? <div className='flex flex-wrap gap-1'>
            {trip.lakes?.map((lake: any) => {
              return <Badge appearance={"light"} className='capitaliz'>{lake.lake}</Badge>
            })}
          </div> : "No lakes specified"
          }</p>
          <p>
            <strong>Group Size:</strong> {trip.number_of_people}
          </p>
          <p>
            <strong>Dates:</strong> {formatDate(trip.start_date)} → {formatDate(trip.end_date)}
          </p>
        </div>
      </div>

      {/* Right Side — Action + Progress */}
      <div className="flex flex-col items-end  lg:mt-0 gap-3 min-w-[180px]">
        {/* Optional Progress (if you want to add like your card layout) */}
        <DropdownMenu2
          id={trip.id}
          trip={trip}
          trigger={
            <Button variant="ghost" mode="icon">
              <EllipsisVertical />
            </Button>
          }
        />

        <div className="w-full">
          <Progress value={60} className="h-1.5 mb-2" />
        </div>


        <div className="flex items-center gap-2">


          <Heart
            onClick={handleFavoriteClick}
            size={20}
            className="hover:text-red-500 transition-all  rounded-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  );


  return (
    <>

      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{trips?.length} Trips</h3>
          <div className="flex gap-4">
            <ToggleGroup
              type="single"
              variant="outline"
              value={activeView}
              onValueChange={() => {
                setActiveView(activeView === 'cards' ? 'list' : 'cards');
              }}
            >
              <ToggleGroupItem value="cards">
                <LayoutGrid size={16} />
              </ToggleGroupItem>
              <ToggleGroupItem value="list">
                <List size={16} />
              </ToggleGroupItem>
            </ToggleGroup>
            <Button onClick={open.onTrue}>
              <Plus className="w-4 h-4 mr-1" /> Add Trip
            </Button>
          </div>
        </div>

        {activeView === 'cards' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {/* {trips.map((trip, i) => renderCard(trip))} */}
            {trips?.map((trip: any) => renderCard(trip))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* {trips.map((trip:any) => renderRow(trip))} */}
            {trips?.map((trip: any) => renderRow(trip))}
          </div>
        )}

        <div className="flex justify-center pt-5">
          <Button variant="dashed" asChild>
            <Link to="#">Show more Trips</Link>
          </Button>
        </div>

        <QuickAddEditTripModal open={open.value} onClose={open.onFalse} currentTrip={""} />
      </div>

    </>
  );
};

export { Projects2, type ITrips2Items, type TripItem };



// const trips: TripItem[] = [
//   {
//     id: 'trip-001',
//     name: 'Hunza Valley Adventure',
//     type: 'Adult',
//     lake: 'Attabad Lake',
//     groupSize: 4,
//     startDate: '2025-04-12',
//     endDate: '2025-04-20',
//     description:
//       'A scenic road trip exploring the breathtaking beauty of Hunza, including boating at Attabad Lake and visits to local forts.',
//     isPrivate: false,
//     progress: {
//       variant: 'bg-green-500',
//       value: 100,
//     },
//     team: {
//       size: 'size-[30px]',
//       group: [
//         { filename: '300-12.png' },
//         { filename: '300-20.png' },
//         { filename: '300-3.png' },
//       ],
//       more: {
//         number: 5,
//         variant: 'text-white ring-background bg-green-500',
//       },
//     },

//     status: {
//       label: 'In Progress',
//       variant: 'primary',
//     },
//   },
//   {
//     id: 'trip-002',
//     name: 'Fairy Meadows Camping',
//     type: 'Family',
//     lake: 'Raikot Lake',
//     groupSize: 6,
//     startDate: '2025-05-10',
//     endDate: '2025-05-15',
//     description:
//       'An unforgettable camping experience under the stars at Fairy Meadows, with hiking to Nanga Parbat base camp.',
//     isPrivate: true,
//     progress: {
//       variant: 'bg-yellow-500',
//       value: 45,
//     },
//     team: {
//       size: 'size-[30px]',
//       group: [
//         { filename: '300-9.png' },
//         { filename: '300-5.png' },
//         { filename: '300-25.png' },
//       ],
//       more: {
//         number: 3,
//         variant: 'text-white ring-background bg-yellow-500',
//       },
//     },
//     status: {
//       label: 'Upcoming',
//       variant: 'secondary',
//     },
//   },
//   {
//     id: 'trip-003',
//     name: 'Skardu Cultural Tour',
//     type: 'Couple',
//     lake: 'Upper Kachura Lake',
//     groupSize: 3,
//     startDate: '2025-06-01',
//     endDate: '2025-06-07',
//     description:
//       'A peaceful cultural tour across Skardu including Shigar Fort, Satpara Lake, and local markets.',
//     isPrivate: false,
//     progress: {
//       variant: 'bg-green-500',
//       value: 100,
//     },
//     team: {
//       size: 'size-[30px]',
//       group: [
//         { filename: '300-15.png' },
//         { filename: '300-19.png' },
//         { filename: '300-23.png' },
//       ],
//       more: {
//         number: 4,
//         variant: 'text-white ring-background bg-green-500',
//       },
//     },
//     status: {
//       label: 'Completed',
//       variant: 'success',
//     },
//   },
//   {
//     id: 'trip-004',
//     name: 'Naltar Valley Skiing',
//     type: 'Friends',
//     lake: 'Naltar Lake',
//     groupSize: 5,
//     startDate: '2025-12-15',
//     endDate: '2025-12-20',
//     description:
//       'A thrilling winter trip to Naltar Valley for skiing and snowboarding adventures.',
//     isPrivate: true,
//     progress: {
//       variant: 'bg-red-500',
//       value: 10,
//     },
//     team: {
//       size: 'size-[30px]',
//       group: [
//         { filename: '300-7.png' },
//         { filename: '300-14.png' },
//         { filename: '300-30.png' },
//       ],
//       more: {
//         number: 2,
//         variant: 'text-white ring-background bg-red-500',
//       },
//     },
//     status: {
//       label: 'Planned',
//       variant: 'warning',
//     },
//   },
//   {
//     id: 'trip-005',
//     name: 'Deosai National Park',
//     type: 'Family',
//     lake: 'Sheosar Lake',
//     groupSize: 4,
//     startDate: '2025-07-20',
//     endDate: '2025-07-25',
//     description:
//       'A nature-filled trip to Deosai National Park, exploring its rich wildlife and the stunning Sheosar Lake.',
//     isPrivate: false,
//     progress: {
//       variant: 'bg-green-500',
//       value: 100,
//     },
//     team: {
//       size: 'size-[30px]',
//       group: [
//         { filename: '300-11.png' },
//         { filename: '300-6.png' },
//         { filename: '300-29.png' },
//       ],
//       more: {
//         number: 6,
//         variant: 'text-white ring-background bg-green-500',
//       },
//     },
//     status: {
//       label: 'In Progress',
//       variant: 'primary',
//     },
//   },
//   {
//     id: 'trip-006',
//     name: 'Chitral and Kalash Valleys',
//     type: 'Friends',
//     lake: 'Bumburet Lake',
//     groupSize: 5,
//     startDate: '2025-08-15',
//     endDate: '2025-08-22',
//     description:
//       'A cultural and scenic trip to Chitral and the unique Kalash Valleys, including visits to Bumburet Lake.',
//     isPrivate: true,
//     progress: {
//       variant: 'bg-yellow-500',
//       value: 60,
//     },
//     team: {
//       size: 'size-[30px]',
//       group: [
//         { filename: '300-4.png' },
//         { filename: '300-18.png' },
//         { filename: '300-27.png' },
//       ],
//       more: {
//         number: 4,
//         variant: 'text-white ring-background bg-yellow-500',
//       },
//     },
//     status: {
//       label: 'In Progress',
//       variant: 'primary',
//     },
//   }
// ];