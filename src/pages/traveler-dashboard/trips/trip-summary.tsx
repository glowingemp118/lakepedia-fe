import { Card } from '@/components/ui/card'
import { formatDate } from '@/lib/helpers'
import { FC } from 'react'


interface PageProps {
    trip: any
}
const TripSummary: FC<PageProps> = ({ trip }) => {
    return (
        <Card className="p-6 border rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Trip Summary</h3>
            <ul className="text-sm text-gray-600 space-y-3">
                <li className="flex justify-between"><span>Trip ID:</span> <span className="font-medium">{trip?.id}</span></li>
                <li className="flex justify-between"><span>Start Date:</span> <span>{formatDate(trip?.start_date)}</span></li>
                <li className="flex justify-between"><span>End Date:</span> <span>{formatDate(trip?.end_date)}</span></li>
                <li className="flex justify-between"><span>Duration:</span> <span>{trip?.durationDays ? trip?.durationDays + "Days" : "Not Added"}</span></li>
                <li className="flex justify-between"><span>Budget:</span> <span>{trip?.costBudget?.toLocaleString() ? `PKR ${trip?.costBudget?.toLocaleString()}` : "Not Added"}</span></li>
                <li className="flex justify-between"><span>Spent:</span> <span> {trip?.costSpent?.toLocaleString() ? `PKR ${trip?.costSpent?.toLocaleString()}` : "Not Added"}</span></li>
            </ul>
        </Card>
    )
}

export default TripSummary