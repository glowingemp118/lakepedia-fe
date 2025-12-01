import { Button } from '@/components/ui/button'
import { useBoolean } from '@/hooks/use-boolean'
import { motion } from 'framer-motion'
import { LoaderCircleIcon, Pencil, Plus, Trash } from 'lucide-react'
import { FC, Fragment, useState } from 'react'
import QucikAddEventModal from './quick-add-event-modal'
import { useDeleteTripEventMutation, useGetTripEventsQuery } from '@/store/Reducer/trip'
import { useParams } from 'react-router'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import ConfirmDialog from '@/components/comfirm-dialog/confirm-dialog'
import { toast } from 'react-toastify'

interface TripItineraryProps { }
const TripItinerary: FC<TripItineraryProps> = () => {

    const open = useBoolean();

    const confirm = useBoolean();

    const { id } = useParams();

    const { data, isLoading, isFetching } = useGetTripEventsQuery(id);

    const [deleteTripEvent, { isLoading: isDeleting }] = useDeleteTripEventMutation();

    const [currentEvent, setCurrentEvent] = useState<any>(null)

    console.log("itinerary data", data?.data?.schedules);

    const handleDelete = async () => {

        let response = await deleteTripEvent({ eventId: currentEvent?.id });

        if (!response?.error) {
            toast.success("Event deleted successfully", { autoClose: 1500 });
            confirm.onFalse();
            setCurrentEvent(null);
        }

    }

    return (
        <div className="space-y-8">
            {isLoading || isFetching ?
                <div className='flex justify-center items-center'>
                    <LoaderCircleIcon className="h-6 w-6 animate-spin" />
                </div>
                :
                <>
                    <div className='flex justify-end items-center'>
                        <Button onClick={open.onTrue}><Plus /> Add Event</Button>
                    </div>
                    {data?.data?.schedules?.map((day: any, i: number) => (
                        <Fragment key={i}>
                            <div className={`border-l-2
                                           ${i % 2 === 0 ? 'border-blue-500' : 'border-green-500'} 
                                                  pl-5`}>
                                <div className="text-primary font-bold mb-2 flex flex-row justify-between flex-wrap">
                                    Day {day.day} — {new Date(day.date).toDateString()}
                                    <div>
                                        <Button variant={"ghost"} mode={"icon"}>

                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <Pencil size={16} className='cursor-pointer' onClick={() => {
                                                            setCurrentEvent(day);
                                                            open.onTrue();
                                                        }} />
                                                    </TooltipTrigger>
                                                    <TooltipContent >
                                                        <p>Edit</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </Button>
                                        <Button variant={"ghost"} mode={"icon"}>

                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <Trash color="red" size={16} className='cursor-pointer' onClick={() => {
                                                            setCurrentEvent(day);
                                                            confirm.onTrue();
                                                        }} />
                                                    </TooltipTrigger>
                                                    <TooltipContent >
                                                        <p>Delete</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </Button>
                                    </div>
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
                                            <div >
                                                <p className="font-medium">
                                                    {activity.time} — {activity.activity}
                                                </p>
                                                {activity.description && <p className="text-gray-500 text-sm">{activity.description}</p>}

                                            </div>

                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </Fragment>
                    ))}
                    <QucikAddEventModal open={open.value} onClose={open.onFalse} currentEvent={currentEvent} />

                    <ConfirmDialog
                        title="Delete Event"
                        content="Are you sure you want to delete this event?"
                        open={confirm.value}
                        onClose={() => {
                            setCurrentEvent(null);
                            confirm.onFalse();
                        }}
                        action={
                            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                                {isDeleting ? <span className="flex items-center gap-2">
                                    <LoaderCircleIcon className="h-4 w-4 animate-spin" /> Loading...
                                </span> : "Delete"}
                            </Button>
                        }
                    />
                </>
            }
        </div>
    )
}

export default TripItinerary