import { Container } from '@/components/common/container'
import { Navbar } from '@/components/layouts/layout-3/components/navbar'
import { toAbsoluteUrl } from '@/lib/helpers'
import { selectUser } from '@/store/slices/userSlice'
import { CircleUser, Mail, MapPin } from 'lucide-react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { UserHero } from '../../profile/profile-hero'
import GeneralActions from '../general-actions'
import TodoSection from '../to-do-section'

const TodoView = () => {

    const user = useSelector(selectUser)

    const image = (
        <img
            src={toAbsoluteUrl(user?.image as string || '/media/avatars/300-1.png')}
            className="rounded-full border-3 border-green-500 size-[100px] shrink-0"
            alt="image"
        />
    )

    const CapitalizeRole = (role?: string) => {
        if (!role) return ''
        return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()
    }

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
        <div className="space-y-6">
            {/* Hero Section */}
            <UserHero
                name={`${CapitalizeRole(user?.first_name as string || 'Jenny')} ${CapitalizeRole(
                    user?.last_name as string || 'Klabber'
                )}`}
                image={image}
                info={[
                    { label: CapitalizeRole(user?.role as string || 'Traveler'), icon: CircleUser },
                    { label: 'SF, Bay Area', icon: MapPin },
                    { label: user?.email as string || 'jenny@kteam.com', icon: Mail },
                ]}
            />
            <Container>
                <Navbar />
            </Container>


            <Container>
                <GeneralActions />
                <TodoSection />
            </Container>
        </div>
    )
}

export default TodoView
