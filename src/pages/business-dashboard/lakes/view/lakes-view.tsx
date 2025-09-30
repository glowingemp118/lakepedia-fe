import { toAbsoluteUrl } from '@/lib/helpers'
import { UserHero } from '@/partials/common/user-hero'
import { selectUser } from '@/store/slices/userSlice'
import { CircleUser, Mail, MapPin } from 'lucide-react'
import { useSelector } from 'react-redux'

const LakesView = () => {

    const user = useSelector(selectUser);
    const image = (
        <img
            src={toAbsoluteUrl('/media/avatars/300-1.png')}
            className="rounded-full border-3 border-green-500 size-[100px] shrink-0"
            alt="image"
        />
    );
    
    const CapitalizeRole=(role:string)=>{
        return role.charAt(0).toUpperCase() + role.slice(1);
    }

    return (
        <div>
            <UserHero
                name={user?.name as string || "Jenny Klabber"}
                image={image}
                info={[
                    { label: CapitalizeRole(user?.role as string || "Traveler"), icon: CircleUser  },
                    { label: 'SF, Bay Area', icon: MapPin },
                    { email: user?.email  as string || "jenny@kteam.com", icon: Mail },
                ]}
            />
        </div>
    )
}

export default LakesView