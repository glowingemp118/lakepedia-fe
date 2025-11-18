import { Button } from '@/components/ui/button'
import { useBoolean } from '@/hooks/use-boolean'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { FC, Fragment } from 'react'
import QucikAddEventModal from './quick-add-event-modal'
import { useGetTripEventsQuery } from '@/store/Reducer/trip'
import { useParams } from 'react-router'

interface PageProps {
    trip: any
}
const TripItinerary: FC<PageProps> = ({ trip }) => {

    const open = useBoolean();

    const { id } = useParams();

    const { data } = useGetTripEventsQuery(id);

    console.log("itinerary data", data);

    return (
        <div className="space-y-8">
            <div className='flex justify-end items-center'>
                <Button onClick={open.onTrue}><Plus /> Add Event</Button>
            </div>
            {trip.itinerary.map((day: any, i: number) => (
                <Fragment key={i}>
                    <div className={`border-l-2
                                           ${i % 2 === 0 ? 'border-blue-500' : 'border-green-500'} 
                                                  pl-5`}>
                        <div className="text-primary font-bold mb-2">
                            Day {day.day} — {new Date(day.date).toDateString()}
                        </div>
                        {day.activities.map((activity: any, j: number) => (
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
            <QucikAddEventModal open={open.value} onClose={open.onFalse} currentEvent="" />
        </div>
    )
}

export default TripItinerary