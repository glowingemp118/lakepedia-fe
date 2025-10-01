import { Container } from '@/components/common/container'
import { toAbsoluteUrl } from '@/lib/helpers'
import { UserHero } from '../../profile/profile-hero'
import { selectUser } from '@/store/slices/userSlice'
import { CircleUser, Mail, MapPin } from 'lucide-react'
import { useSelector } from 'react-redux'
import { ProfileActivityContent } from '../profile-basic-content'
import { Navbar } from '@/components/layouts/layout-3/components/navbar'

const ActivityView = () => {

    const user = useSelector(selectUser);
    const image = (
        <img
            src={toAbsoluteUrl(user?.image as string|| '/media/avatars/300-1.png')}
            className="rounded-full border-3 border-green-500 size-[100px] shrink-0"
            alt="image"
        />
    );

    const CapitalizeRole = (role: string) => {
        return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    }

    return (
        <div className='md:mx-10 mx-2 my-4 flex flex-col gap-6'>
            <UserHero
                name={CapitalizeRole(user?.first_name as string || "Jenny") + " " + CapitalizeRole(user?.last_name as string || "Klabber")}
                image={image}
                info={[
                    { label: CapitalizeRole(user?.role as string || "Traveler"), icon: CircleUser },
                    { label: 'SF, Bay Area', icon: MapPin },
                    { email: user?.email as string || "jenny@kteam.com", icon: Mail },
                ]}
            />
            <Container>
                <Navbar />
            </Container>
            <Container>
                <div className="flex flex-wrap items-center gap-5 justify-between mb-7.5">
                    <h3 className="text-lg text-mono font-semibold">Activity</h3>
                </div>
                <ProfileActivityContent />
            </Container>
        </div>
    )
}

export default ActivityView