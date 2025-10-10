import { FC } from 'react'

interface PageProps {
    trip: any
}
const TripActivity: FC<PageProps> = ({ trip }) => {
    return (
        <ul className="space-y-2">
            {trip.activityLogs.map((log: { id: string; time: string; description: string; by: string }) => (
                <li key={log.id} className="text-sm text-gray-700 border-l-2 border-green-500 pl-3 py-2">
                    <span className="font-medium">{log.time}</span> — {log.description}{' '}
                    <span className="italic">by {log.by}</span>
                </li>
            ))}
        </ul>
    )
}

export default TripActivity