import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import clsx from "clsx"
import { CheckCircle2, Clock } from "lucide-react"
import { useState } from "react"


const TodoSection = () => {

  
    const initialTrips = [
        {
            id: 1,
            title: 'Lake Tahoe Adventure',
            progress: 2 / 4,
            tasks: [
                { id: 1, label: 'Book accommodations', done: false },
                { id: 2, label: 'Rent fishing gear', done: true },
                { id: 3, label: 'Invite friends', done: false },
                { id: 4, label: 'Upload ID documents', done: true },
            ],
        },
        {
            id: 2,
            title: 'Alaska Fishing Trip',
            progress: 1 / 3,
            tasks: [
                { id: 1, label: 'Book flights', done: false },
                { id: 2, label: 'Rent cabin', done: false },
                { id: 3, label: 'Submit waiver form', done: true },
            ],
        },
    ]

    const [trips, setTrips] = useState(initialTrips)

    const toggleTask = (tripId: number, taskId: number) => {
        setTrips((prev) =>
            prev.map((trip) =>
                trip.id === tripId
                    ? {
                        ...trip,
                        tasks: trip.tasks.map((task) =>
                            task.id === taskId ? { ...task, done: !task.done } : task
                        ),
                    }
                    : trip
            )
        )
    }

    return (
        <div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trips.map((trip) => (
                    <Card key={trip.id} className="card">
                        {/* Card Header */}
                        <CardHeader className="card-header border-0">
                            <CardTitle className="card-title">{trip.title}</CardTitle>
                            <span className="text-muted">
                                {Math.round(trip.progress * 100)}% done
                            </span>
                        </CardHeader>

                        {/* Card Body (Metronic style list) */}
                        <CardContent className="card-body p-0">
                            {trip.tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className={clsx(
                                        'd-flex align-items-center px-5 py-3 border-bottom cursor-pointer',
                                        task.done && 'bg-light-success'
                                    )}
                                    onClick={() => toggleTask(trip.id, task.id)}
                                >
                                    {task.done ? (
                                        <CheckCircle2 className="me-3 text-success" size={18} />
                                    ) : (
                                        <Clock className="me-3 text-gray-500" size={18} />
                                    )}
                                    <span
                                        className={clsx(
                                            'fw-semibold',
                                            task.done && 'text-muted text-decoration-line-through'
                                        )}
                                    >
                                        {task.label}
                                    </span>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className="card-footer">
                            <Progress
                                value={trip.progress * 100}
                                className="h-1"
                                indicatorClassName="bg-success"
                            />
                        </CardFooter>
                    </Card>
                ))}


            </div>
        </div>
    )
}

export default TodoSection