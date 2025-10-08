import { Container } from "@/components/common/container";
import { Navbar } from '@/components/layouts/layout-3/components/navbar';
import { toAbsoluteUrl } from "@/lib/helpers";
import { selectUser } from "@/store/slices/userSlice";
import { CircleUser, Mail, MapPinPen } from "lucide-react";
import { useSelector } from "react-redux";
import { UserHero } from "../../profile/profile-hero";
import BasicDetails from "../basic-details";
import DeactiveCard from "../deactive-card";
import SignInMethod from "../signin-method";
import { Settings } from "../settings";
import { ConnectAccount } from "../connect-account";


const SettingsView = () => {


    const user = useSelector(selectUser);

    const image = (
        <img
            src={toAbsoluteUrl(user?.image as string || '/media/avatars/300-1.png')}
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
                    { label: 'SF, Bay Area', icon: MapPinPen },
                    { email: user?.email as string || "jenny@kteam.com", icon: Mail },
                ]}
            />
            <Container>
                <Navbar />
            </Container>
            <Container className='flex flex-col gap-6'>
                <BasicDetails profileData={user} />
                <SignInMethod email={user?.email as string || "jenny@kteam.com"} />
                <ConnectAccount />
                <Settings />
                <DeactiveCard />
            </Container>
        </div>
    )
}

export { SettingsView }