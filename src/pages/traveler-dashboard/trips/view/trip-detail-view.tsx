

import { Container } from '@/components/common/container';
import { Navbar } from '@/components/layouts/layout-3/components/navbar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { toAbsoluteUrl } from '@/lib/helpers';
import { selectUser } from '@/store/slices/userSlice';
import { m, motion } from 'framer-motion';
import { Calendar, CircleUser, Clock, FileText, LayoutGrid, List, Mail, Map, MapPin, Users } from 'lucide-react';
import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { UserHero } from '../../profile/profile-hero';
import { CardWork, CardWorkRow } from '@/partials/cards';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';


export const TripDetailView = () => {

    const { id } = useParams();

    const [activeView, setActiveView] = useState('cards');

    const user = useSelector(selectUser);

    const trip = sampleTripData;

    const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'files' | 'activity'>('overview');

    const image = (
        <img
            src={toAbsoluteUrl('/media/avatars/300-1.png')}
            className="rounded-full border-3 border-green-500 size-[100px] shrink-0"
            alt="user"
        />
    );

    const CapitalizeRole = (role: string) =>
        role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Traveler';

    return (
        <div className="md:mx-10 mx-2 my-4 flex flex-col gap-6">
            {/* Hero Section */}
            <UserHero
                name={user?.name as string || 'Jenny Klabber'}
                image={image}
                info={[
                    { label: CapitalizeRole(user?.role as string || 'Traveler'), icon: CircleUser },
                    { label: 'SF, Bay Area', icon: MapPin },
                    { label: user?.email as string || 'jenny@kteam.com', icon: Mail },
                ]}
            />

            <Container>
                <Navbar />
            </Container>

            {/* Trip Header */}
          <Container className='flex flex-col gap-6'>
               <Card className="p-6 shadow-lg border rounded-2xl">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold">{trip.title}</h1>
                        <p className="text-gray-500 mt-2">{trip.description}</p>
                    </div>
                    <div className="flex gap-3">
                        <Badge>{trip.tripType === 'adult' ? 'Adult Trip' : 'Family Trip'}</Badge>
                        <Badge appearance={"light"}
                        variant={trip.status === 'Completed' ? 'success' : trip.status === 'In Progress' ? 'success' : 'warning'}
                        >
                            {trip.status}
                        </Badge>
                    </div>
                </div>
            </Card>

            {/* Main Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sidebar Summary */}
                <div className="col-span-1 space-y-6">
                    <Card className="p-6 border rounded-2xl shadow-sm">
                        <h3 className="text-lg font-semibold mb-4">Trip Summary</h3>
                        <ul className="text-sm text-gray-600 space-y-3">
                            <li className="flex justify-between"><span>Trip ID:</span> <span className="font-medium">{trip.tripId}</span></li>
                            <li className="flex justify-between"><span>Start Date:</span> <span>{trip.startDate}</span></li>
                            <li className="flex justify-between"><span>End Date:</span> <span>{trip.endDate}</span></li>
                            <li className="flex justify-between"><span>Duration:</span> <span>{trip.durationDays} Days</span></li>
                            <li className="flex justify-between"><span>Budget:</span> <span>PKR {trip.costBudget.toLocaleString()}</span></li>
                            <li className="flex justify-between"><span>Spent:</span> <span>PKR {trip.costSpent.toLocaleString()}</span></li>
                        </ul>
                    </Card>

                    {/* Participants */}
                    <Card className="p-6 border rounded-2xl shadow-sm">
                        <div className='flex justify-between items-center mb-4'>
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Users size={18} /> Group Members</h3>
                            <span className="text-sm text-gray-500">{trip.participants.length} Members</span>
                        </div>
                        <div className="space-y-3">
                            {trip.participants.map((p) => (
                                <div key={p.id} className="flex items-center gap-3">
                                    <img src={toAbsoluteUrl(p.avatarUrl)} alt={p.name} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="font-medium">{p.name}</p>
                                        <p className="text-xs text-gray-500">{p.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Main Content Tabs */}
                <div className="col-span-2">
                    {/* Tabs */}
                    <div className="flex border-b mb-4">
                        {[
                            { key: 'overview', label: 'Overview', icon: Map },
                            { key: 'itinerary', label: 'Itinerary', icon: Clock },
                            { key: 'files', label: 'Files', icon: FileText },
                            { key: 'activity', label: 'Activity Log', icon: Calendar },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key as any)}
                                className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-all cursor-pointer ${activeTab === tab.key
                                    ? 'border-primary text-primary font-medium'
                                    : 'border-transparent text-gray-500 hover:text-primary'
                                    }`}
                            >
                                <tab.icon size={16} /> {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="p-4  rounded-xl border shadow-sm">
                        {activeTab === 'overview' && (
                            <>
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-1"><Map size={16} /> Destinations</h3>
                                    <p className="text-gray-700">{trip.destinations.join(', ')}</p>
                                </motion.div>
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
                                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-1"><MapPin size={16} /> Notable Lakes</h3>
                                    <LakesSection lakes={lakes} />
                                </motion.div>
                            </>
                        )}

                        {activeTab === 'itinerary' && (
                            <div className="space-y-8">
                                {trip.itinerary.map((day, i) => (
                                    <Fragment key={i}>
                                        <div className={`border-l-2
                                             ${i === 0 && 'border-green-500'}
                                             ${i === 1 && 'border-red-400'}
                                                ${i === 2 && 'border-yellow-400'}
                                                ${i === 3 && 'border-blue-400'}
                                                ${i === 4 && 'border-purple-400'}
                                                ${i === 5 && 'border-pink-400'}
                                                ${i === 6 && 'border-indigo-400'}
                                                ${i === 7 && 'border-teal-400'}
                                              pl-5`}>
                                            <div className="text-primary font-bold mb-2">
                                                Day {day.day} — {new Date(day.date).toDateString()}
                                            </div>
                                            {day.activities.map((activity, j) => (
                                                <motion.div
                                                    key={j}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: j * 0.1 }}
                                                    className="mb-3"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                                        <div>
                                                            <p className="font-medium">
                                                                {activity.time} — {activity.title}
                                                            </p>
                                                            {activity.notes && <p className="text-gray-500 text-sm">{activity.notes}</p>}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </Fragment>
                                ))}
                            </div>
                        )}

                        {activeTab === 'files' && (
                            <div >
                                <div className="flex items-center justify-end mb-4">
                                    <ToggleGroup
                                        type="single"
                                        variant="outline"
                                        value={activeView}
                                        onValueChange={(value) => {
                                            if (value) setActiveView(value);
                                        }}
                                    >
                                        <ToggleGroupItem value="cards">
                                            <LayoutGrid size={16} />
                                        </ToggleGroupItem>
                                        <ToggleGroupItem value="list">
                                            <List size={16} />
                                        </ToggleGroupItem>
                                    </ToggleGroup>


                                </div>
                                {activeView === 'cards' &&
                                    <div id="works_cards">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7.5">

                                            {trip.attachments.map((file: any) => (
                                                <CardWork
                                                    title={file.title}
                                                    image={file.image}
                                                    authorName={file.authorName}
                                                    authorAvatar={file.authorAvatar}
                                                    likes={file.likes}
                                                    comments={file.comments}
                                                    key={file.title}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                }
                                {activeView === 'list' &&
                                    <div id="works_list">
                                        <div className="flex flex-col gap-5 lg:gap-7.5">
                                            {trip.attachments.map((file: any) => {
                                                return (
                                                    <CardWorkRow
                                                        description={file.description}
                                                        title={file.title}
                                                        image={file.image}
                                                        authorName={file.authorName}
                                                        authorAvatar={file.authorAvatar}
                                                        likes={file.likes}
                                                        comments={file.comments}
                                                        key={file.title}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                }
                            </div>
                        )}

                        {activeTab === 'activity' && (
                            <ul className="space-y-2">
                                {trip.activityLogs.map((log) => (
                                    <li key={log.id} className="text-sm text-gray-700 border-l-2 border-green-500 pl-3 py-2">
                                        <span className="font-medium">{log.time}</span> — {log.description}{' '}
                                        <span className="italic">by {log.by}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
          </Container>
        </div >
    );
};

export default TripDetailView;

const sampleTripData = {
    tripId: 'TRIP2025-001',
    title: 'Northern Pakistan Explorer',
    status: 'In Progress',
    tripType: 'adult',
    startDate: '2025-10-15',
    endDate: '2025-10-22',
    durationDays: 8,
    destinations: ['Lahore', 'Skardu', 'Hunza', 'Gilgit'],
    description: 'An adventurous trip exploring the northern areas of Pakistan.',
    costBudget: 500000,
    costSpent: 320000,
    participants: [
        { id: 'U001', name: 'Alice Khan', role: 'Leader', avatarUrl: '/media/avatars/300-1.png', email: 'alice@example.com' },

        { id: 'U002', name: 'Bob Ahmed', role: 'Traveler', avatarUrl: '/media/avatars/300-2.png', email: 'bob@example.com' },

        { id: 'U003', name: 'Carol Rizvi', role: 'Traveler', avatarUrl: '/media/avatars/300-3.png', email: 'carol@example.com' },

        { id: 'U004', name: 'David Lee', role: 'Traveler', avatarUrl: '/media/avatars/300-4.png', email: 'david@example.com' },

        { id: 'U005', name: 'Eva Green', role: 'Traveler', avatarUrl: '/media/avatars/300-5.png', email: 'eva@example.com' },

        { id: 'U006', name: 'Frank Miller', role: 'Traveler', avatarUrl: '/media/avatars/300-6.png', email: 'frank@example.com' }
    ],
    attachments: [
        {
            title: 'Urban Dreams',
            description: 'Cloud storage and file sharing',
            image: '21.jpg',
            authorName: 'Cody Fisher',
            authorAvatar: '300-6.png',
            likes: 24,
            comments: 5,
        },
        {
            title: 'Whispered Emotions',
            description: 'Neutrals are the epitome of timeless elegance',
            image: '3.jpg',
            authorName: 'Wade Warren',
            authorAvatar: '300-14.png',
            likes: 187,
            comments: 49,
        },
        {
            title: 'Golden Serenity',
            description: 'Choose the right time. ',
            image: '22.jpg',
            authorName: 'Albert Flores',
            authorAvatar: '300-11.png',
            likes: 60,
            comments: 13,
        },
        {
            title: 'Mystic Shadows',
            description: 'Her alluring appearance radiates calmness.',
            image: '23.jpg',
            authorName: 'Kathryn Murphy',
            authorAvatar: '300-1.png',
            likes: 37,
            comments: 16,
        },
        {
            title: 'Wild Beauty',
            description: 'Pulled apart by reality',
            image: '14.jpg',
            authorName: 'Devon Lane',
            authorAvatar: '300-16.png',
            likes: 625,
            comments: 109,
        },
        {
            title: 'Timeless Elegance',
            description: 'The charm and limit of shadows',
            image: '25.jpg',
            authorName: 'Jenny Wilson',
            authorAvatar: '300-5.png',
            likes: 6,
            comments: 1,
        },
        {
            title: 'Intrepid Travel',
            description: 'Understand the world with us',
            image: '26.jpg',
            authorName: 'Jhon Smith',
            authorAvatar: '300-25.png',
            likes: 30,
            comments: 22,
        },
        {
            title: 'We rise together',
            description: 'We share the best experiences with you',
            image: '2.jpg',
            authorName: 'Adam Cruse',
            authorAvatar: '300-29.png',
            likes: 19,
            comments: 23,
        },
    ],
    activityLogs: [
        { id: 'A001', time: '2025-09-15 10:00', description: 'Trip created', by: 'Alice Khan' },

        { id: 'A002', time: '2025-09-20 15:30', description: 'Added participant Bob', by: 'Alice Khan' },

        { id: 'A003', time: '2025-09-22 09:15', description: 'Uploaded itinerary document', by: 'Alice Khan' },
    ],
    itinerary: [
        { day: 1, date: '2025-10-15', activities: [{ time: '08:00', title: 'Depart Lahore', notes: 'Bus to Islamabad' }, { time: '14:00', title: 'Arrive Islamabad', notes: 'Lunch en route' }] },

        { day: 2, date: '2025-10-16', activities: [{ time: '09:00', title: 'Fly to Skardu', notes: '45 min flight' }, { time: '13:00', title: 'Visit Shangrila Resort', notes: 'Photography stop' }] },

        { day: 3, date: '2025-10-17', activities: [{ time: '10:00', title: 'Explore Hunza Valley', notes: 'Visit Baltit Fort' }, { time: '16:00', title: "Sunset at Eagle's Nest", notes: 'Scenic viewpoint' }] },

        { day: 4, date: '2025-10-18', activities: [{ time: '09:00', title: 'Depart for Fairy Meadows', notes: 'Jeep ride to Raikot Bridge' }, { time: '12:00', title: 'Lunch at Raikot', notes: 'Local cuisine' }, { time: '15:00', title: 'Trek to Fairy Meadows', notes: '4-5 hours trek' }] },

        { day: 5, date: '2025-10-19', activities: [{ time: '08:00', title: 'Depart for Naltar Valley', notes: 'Jeep ride to Naltar' }, { time: '12:00', title: 'Lunch at Naltar', notes: 'Local cuisine' }, { time: '15:00', title: 'Explore Naltar Valley', notes: 'Visit Naltar Lake' }] },

        { day: 6, date: '2025-10-20', activities: [{ time: '10:00', title: 'Return to Gilgit', notes: 'Scenic drive' }, { time: '14:00', title: 'City Tour of Gilgit', notes: 'Visit local markets' }] },

        { day: 7, date: '2025-10-21', activities: [{ time: '09:00', title: 'Fly back to Islamabad', notes: 'Morning flight' }, { time: '13:00', title: 'Free time in Islamabad', notes: 'Shopping and leisure' }] },

        { day: 8, date: '2025-10-22', activities: [{ time: '10:00', title: 'Depart for Lahore', notes: 'Bus to Lahore' }, { time: '16:00', title: 'Arrive Lahore', notes: 'End of trip' }] },
    ],
};



export const LakesSection = ({ lakes }: { lakes: any[] }) => {
    if (!lakes || lakes.length === 0) return null;

    return (
        <>
            <ScrollArea className="w-full">
                <div className="flex gap-6 min-w-max">
                    {lakes.map((lake, i) => (
                        <motion.div
                            key={lake.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15 }}
                            className=" rounded-xl overflow-hidden shadow-md hover:shadow-lg bg-white dark:bg-gray-900 transition-all border rounded-t-xl w-[280px] bg-cover bg-center"
                        >
                            <img
                                src={toAbsoluteUrl(`/media/images/600x600/${lake.imageUrl}`)}
                                alt={lake.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                                    {lake.name}
                                </h4>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                    <MapPin size={14} className="text-green-500" />
                                    <span>{lake.location}</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                                    {lake.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <ScrollBar orientation="horizontal" />
            </ScrollArea>

        </>
    );
};


const lakes = [
    {
        id: 'L001',
        name: 'Attabad Lake',
        location: 'Hunza Valley, Gilgit-Baltistan',
        imageUrl: 'lake1.jpg',
        description: 'A stunning turquoise lake formed after a landslide in 2010, known for boating and scenic beauty.'
    },
    {
        id: 'L002',
        name: 'Satpara Lake',
        location: 'Skardu, Gilgit-Baltistan',
        imageUrl: 'lake2.jpg',
        description: 'A natural lake providing water to Skardu city, surrounded by mountains and ideal for fishing.'
    },
    {
        id: 'L003',
        name: 'Sheosar Lake',
        location: 'Deosai National Park',
        imageUrl: 'lake3.jpeg',
        description: 'Located in the Deosai Plains, one of the world’s highest lakes offering breathtaking views.'
    }, {
        id: 'L004',
        name: 'Kachura Lakes',
        location: 'Skardu, Gilgit-Baltistan',
        imageUrl: 'lake1.jpg',
        description: 'Comprising Upper and Lower Kachura Lakes, known for their clear waters and surrounding greenery.'
    }
]
