import { Container } from "@/components/common/container";
import { Navbar } from '@/components/layouts/layout-3/components/navbar';
import { selectUser } from "@/store/slices/userSlice";
import { useSelector } from "react-redux";
import { UserHeroWithProfile } from "../../profile/profile-hero";
import BasicDetails from "../basic-details";
import { ConnectAccount } from "../connect-account";
import DeactiveCard from "../deactive-card";
import EmailPreference from "../email-preference";
import { Settings } from "../notification-settings";
import SignInMethod from "../signin-method";


const SettingsView = () => {


    const user = useSelector(selectUser);


    return (
        <div className='md:mx-10 mx-2 my-4 flex flex-col gap-6'>
            <UserHeroWithProfile /> 
            <Container>
                <Navbar />
            </Container>
            <Container className='flex flex-col gap-6'>
                <BasicDetails profileData={user} />
                <SignInMethod email={user?.email as string || "jenny@kteam.com"} />
                <ConnectAccount />
                <EmailPreference />
                <Settings />
                <DeactiveCard />
            </Container>
        </div>
    )
}

export default SettingsView