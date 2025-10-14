import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Bell, Building, MessageCircleHeart } from 'lucide-react';
import { FC, useState } from 'react';
import RecommendationsPOIs from './recommendations-pois';
import RecommendationsActivities from './recommendations-activites';
import RecommendationsAccommodations from './recommendations-accommodations';
import { motion } from 'framer-motion';
interface PageProps {
    trip: any
}
const TripRecommendations: FC<PageProps> = ({ trip }) => {

    const [subActiveTab, setSubActiveTab] = useState<'activities' | 'accommodations' | 'pois'>('activities');

    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

                <ScrollArea>

                    <div className="flex border-b mb-4">
                        {[
                            { key: 'activities', label: 'Activities', icon: Bell },
                            { key: 'accommodations', label: 'Accommodations', icon: Building },
                            { key: 'pois', label: 'POIs', icon: MessageCircleHeart },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setSubActiveTab(tab.key as any)}
                                className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-all cursor-pointer ${subActiveTab === tab.key
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
            </motion.div>

            <div className="mt-4">

                {subActiveTab === 'activities' && <RecommendationsActivities />}

                {subActiveTab === 'accommodations' && <RecommendationsAccommodations />}

                {subActiveTab === 'pois' && <RecommendationsPOIs />}

            </div>
        </>

    )
}

export default TripRecommendations