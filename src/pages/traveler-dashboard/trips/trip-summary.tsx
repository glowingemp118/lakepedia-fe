import React, { FC } from 'react'
import { Card } from '@/components/ui/card'


interface PageProps {
    trip: any
}
const TripSummary: FC<PageProps> = ({ trip }) => {
    return (
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
    )
}

export default TripSummary