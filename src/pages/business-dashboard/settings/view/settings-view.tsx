import { Container } from "@/components/common/container";
import { Navbar } from '@/components/layouts/layout-3/components/navbar';
import { selectUser } from "@/store/slices/userSlice";
import { useSelector } from "react-redux";
import { BusinessHeroWithProfile } from "../../profile/profile-hero";
import BasicDetails from "../basic-details";
import { ConnectAccount } from "../connect-account";
import ContactInformation from "../contact-information";
import DeactiveCard from "../deactive-card";
import EmailPreference from "../email-preference";
import MediaInformation from "../media";
import { Settings } from "../notification-settings";
import Operations from "../operations";
import Promotions from "../promotions";
import SignInMethod from "../signin-method";
import TrustAndEngagement from "../trust-and-engement";


const BusinessSettingsView = () => {

    const user = useSelector(selectUser);


    return (
        <div className='md:mx-10 mx-2 my-4 flex flex-col gap-6'>

            <BusinessHeroWithProfile />
            <Container>
                <Navbar />
            </Container>
            <Container className='flex flex-col gap-6'>
                <BasicDetails profileData={user} />
                <ContactInformation profileData={user} />
                <Operations profileData={user} />
                <MediaInformation profileData={user} />
                <TrustAndEngagement profileData={user} />
                <Promotions profileData={user} />
                <SignInMethod email={user?.email as string || "jenny@kteam.com"} />
                <ConnectAccount />
                <EmailPreference />
                <Settings />
                <DeactiveCard />
            </Container>
        </div>
    )
}

export { BusinessSettingsView };

