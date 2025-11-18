import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useBoolean } from '@/hooks/use-boolean'
import { formatDate } from '@/lib/helpers'
import { FC } from 'react'
import QuickAddEditTripModal from './quick-add-edit-trip-modal'


interface PageProps {
    trip: any
}
const TripSummary: FC<PageProps> = ({ trip }) => {

    const open = useBoolean();

    return (
        <Card className="p-6 border rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Trip Summary</h3>
            <ul className="text-sm text-gray-600 space-y-3">
                <li className="flex justify-between"><span>Trip ID:</span> <span className="font-medium">{trip?.id}</span></li>
                <li className="flex justify-between"><span>Start Date:</span> <span>{formatDate(trip?.start_date)}</span></li>
                <li className="flex justify-between"><span>End Date:</span> <span>{formatDate(trip?.end_date)}</span></li>
                <li className="flex justify-between"><span>Duration:</span> <span>{
                    Math.ceil((new Date(trip?.end_date).getTime() - new Date(trip?.start_date).getTime()) / (1000 * 60 * 60 * 24))
                    + " " + "Days"}</span></li>
                <li className="flex justify-between"><span>Budget:</span> <span>{trip?.budget?.toLocaleString() ? `PKR ${trip?.budget?.toLocaleString()}` : <Button onClick={open.onTrue}>Add Badget</Button>}</span></li>
                <li className="flex justify-between"><span>Spent:</span> <span> {trip?.costSpent?.toLocaleString() ? `PKR ${trip?.costSpent?.toLocaleString()}` : "Not Added"}</span></li>
            </ul>
            <QuickAddEditTripModal open={open.value} onClose={open.onFalse} currentTrip={trip} />
        </Card>
    )
}

export default TripSummary