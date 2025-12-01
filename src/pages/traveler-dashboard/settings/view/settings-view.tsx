import { Container } from "@/components/common/container";
import { Navbar } from '@/components/layouts/layout-3/components/navbar';
import { ScreenLoader } from "@/components/screen-loader";
import { useGetProfileQuery } from "@/store/Reducer/users";
import { useMemo } from "react";
import { UserHeroWithProfile } from "../../profile/profile-hero";
import BasicDetails from "../basic-details";
import DeactiveCard from "../deactive-card";
import EmailPreference from "../email-preference";
import { Settings } from "../notification-settings";
import SignInMethod from "../signin-method";
import SocialMediaAccount from "../social-media-account";


const SettingsView = () => {

    const { data: profileData, isLoading } = useGetProfileQuery({});

    const basicDetails = useMemo(() => ({
        country: profileData?.user?.country || '',
        usState: profileData?.user?.state || '',
        photo: profileData?.user?.image?.url || '',
        first_name: profileData?.user?.first_name || '',
        last_name: profileData?.user?.last_name || '',
        email: profileData?.user?.email || '',
    }), [profileData]);

    const socialMediaDetails = useMemo(() => ({
        website: profileData?.user?.accounts?.website || '',
        facebook: profileData?.user?.accounts?.facebook || '',
        instagram: profileData?.user?.accounts?.instagram || '',
        youtube: profileData?.user?.accounts?.youtube || '',
    }), [profileData]);

    const emailPreference = useMemo(() => ({
        activities_email: profileData?.user?.emailPreferences?.activities_email,
        password_email: profileData?.user?.emailPreferences?.password_email,
    }), [profileData]);



    const travelerSettings = useMemo(() => ({
        privacy: {
            profile_public: profileData?.user?.privacy?.profile_public,
            show_location: profileData?.user?.privacy?.show_location,
            show_past_activity: profileData?.user?.privacy?.show_past_activity,
            allow_messages: profileData?.user?.privacy?.allow_messages,
            share_favorite_lakes: profileData?.user?.privacy?.share_favorite_lakes,
            share_trips: profileData?.user?.privacy?.share_trips,
            display_social_links: profileData?.user?.privacy?.display_social_links
        },
        notifications: {
            notify_post_reply: profileData?.user?.notifications?.notify_post_reply,
            notify_comment_reply: profileData?.user?.notifications?.notify_comment_reply,
            notify_lake_reviewed: profileData?.user?.notifications?.notify_lake_reviewed,
            notify_messages: profileData?.user?.notifications?.notify_direct_message,
            notify_new_photo_on_followed_lake: profileData?.user?.notifications?.notify_new_photo_on_followed_lake,
            notify_trip_suggestions: profileData?.user?.notifications?.notify_trip_suggestions,
            notify_announcements: profileData?.user?.notifications?.notify_platform_announcements,
            notify_mentions: profileData?.user?.notifications?.notify_mentions,
        }
    }), [profileData]);


    return (
        <div className='md:mx-10 mx-2 my-4 flex flex-col gap-6'>
            {isLoading  ?
                <ScreenLoader />
                :
                <>
                    <UserHeroWithProfile />
                    <Container>
                        <Navbar />
                    </Container>
                    <Container className='flex flex-col gap-6'>
                        <BasicDetails profileData={basicDetails} />
                        <SocialMediaAccount profileData={socialMediaDetails} />
                        <SignInMethod email={profileData?.user?.email as string || "jenny@kteam.com"} />
                        {/* <ConnectAccount /> */}
                        <EmailPreference emailPreferences={emailPreference} />
                        <Settings travelerSettings={travelerSettings} />
                        <DeactiveCard />
                    </Container>
                </>
            }
        </div>
    )
}

export default SettingsView