import { motion } from 'framer-motion'
import { FC, Fragment } from 'react'

interface PageProps {
    trip: any
}
const TripItinerary: FC<PageProps> = ({ trip }) => {
    return (
        <div className="space-y-8">
            {trip.itinerary.map((day: any, i: number) => (
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
        </div>
    )
}

export default TripItinerary