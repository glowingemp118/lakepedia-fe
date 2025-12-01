

import { Container } from '@/components/common/container';
import { Navbar } from '@/components/layouts/layout-3/components/navbar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useGetTripByIdQuery } from '@/store/Reducer/trip';
import { Calendar, Clock, FileText, Map, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { UserHeroWithProfile } from '../../profile/profile-hero';
import TripActivity from '../trip-activity';
import Itinerary from '../trip-itinerary';
import TripOverView from '../trip-overview';
import TripRecommendations from '../trip-recommendations';
import TripSummary from '../trip-summary';
import Files from './trip-files';
import { ScreenLoader } from '@/components/screen-loader';


export const TripDetailView = () => {

    const { id } = useParams();

    const { data: tripDetail, isLoading, isFetching } = useGetTripByIdQuery(id, {
        skip: !id
    });

    const trip = tripDetail?.data?.trip;

    const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'files' | 'activity' | "recommendations">('overview');


    return (
        <div className="md:mx-10 mx-2 my-4 flex flex-col gap-6">
            {isLoading || isFetching ?
                <ScreenLoader />
                :
                <>
                    <UserHeroWithProfile />

                    <Container>
                        <Navbar />
                    </Container>

                    {/* Trip Header */}
                    <Container className='flex flex-col gap-6'>
                        <Card className="p-6 shadow-lg border rounded-2xl">
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div>
                                    <h1 className="text-xl font-bold">{trip?.name || "Not Added"}</h1>
                                    <p className="text-gray-500 mt-2">{trip?.description || "Not Added"}</p>
                                </div>
                                <div className="flex gap-3">
                                    <Badge>{trip?.type === 'adult' ? 'Adult Trip' : 'Family Trip'}</Badge>
                                    <Badge appearance={"light"}
                                        variant={(trip?.status === 'in_progress' && 'primary') ||
                                            (trip?.status === 'completed' && 'success') ||
                                            (trip?.status === 'upcoming' && 'warning') ||
                                            (trip?.status === 'planned' && 'destructive') ||
                                            "secondary"}
                                    >
                                        {trip?.status.slice(0,1).toUpperCase() + trip?.status.slice(1).toLowerCase().replace('_', ' ') || "Not Added"}
                                    </Badge>
                                </div>
                            </div>
                        </Card>

                        {/* Main Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="col-span-1 space-y-6">

                                <TripSummary trip={trip} />

                                {/* <TripGroupMember trip={trip} /> */}
                            </div>

                            {/* Main Content Tabs */}
                            <div className="col-span-2">
                                {/* Tabs */}
                                <ScrollArea>

                                    <div className="flex border-b mb-4">
                                        {[
                                            { key: 'overview', label: 'Overview', icon: Map },
                                            { key: 'itinerary', label: 'Itinerary', icon: Clock },
                                            { key: 'files', label: 'Files', icon: FileText },
                                            { key: 'activity', label: 'Activity Log', icon: Calendar },
                                            { key: "recommendations", label: "Recommendations", icon: MapPin }
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
                                    <ScrollBar orientation="horizontal" />
                                </ScrollArea>

                                {/* Tab Content */}
                                <div className="p-4  rounded-xl border shadow-sm">

                                    {activeTab === 'overview' && <TripOverView trip={trip} />}

                                    {activeTab === 'itinerary' && <Itinerary />}

                                    {activeTab === 'files' && <Files trip={sampleTripData} />}

                                    {activeTab === 'activity' && <TripActivity trip={sampleTripData} />}

                                    {activeTab === "recommendations" && <TripRecommendations trip={sampleTripData} />}

                                </div>
                            </div>
                        </div>
                    </Container>
                </>
            }
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



