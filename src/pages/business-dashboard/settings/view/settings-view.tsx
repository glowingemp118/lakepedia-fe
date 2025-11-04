import { Container } from "@/components/common/container";
import { Navbar } from '@/components/layouts/layout-3/components/navbar';
import { useGetBusinessQuery } from "@/store/Reducer/business";
import { useGetProfileQuery } from "@/store/Reducer/users";
import { selectUser } from "@/store/slices/userSlice";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BusinessHeroWithProfile } from "../../profile/profile-hero";
import BasicDetails from "../basic-details";
import ContactInformation from "../contact-information";
import DeactiveCard from "../deactive-card";
import EmailPreference from "../email-preference";
import MediaInformation from "../media";
import { Settings } from "../notification-settings";
import Operations from "../operations";
import Promotions from "../promotions";
import SignInMethod from "../signin-method";
import SocialMediaAccount from "../social-media-account";
import TrustAndEngagement from "../trust-and-engement";


const BusinessSettingsView = () => {

    const { data: profileData, isLoading } = useGetProfileQuery({});

    const { data: businessProfileData } = useGetBusinessQuery({});

    const user = useSelector(selectUser);

    const emailPreference = useMemo(() => ({
        activities_email: profileData?.user?.emailPreferences?.activities_email,
        password_email: profileData?.user?.emailPreferences?.password_email,
    }), [profileData]);

    const businessSettings = useMemo(() => ({
        privacy: {
            profile_public: profileData?.user?.privacy?.profile_public,
            share_trips: profileData?.user?.privacy?.share_trips,
            show_location: profileData?.user?.privacy?.show_location,
            show_past_activity: profileData?.user?.privacy?.show_past_activity,
            allow_messages: profileData?.user?.privacy?.allow_messages,
            share_favorite_lakes: profileData?.user?.privacy?.share_favorite_lakes,
            display_social_links: profileData?.user?.privacy?.display_social_links
        },
        notifications: {
            notify_announcements: profileData?.user?.notifications?.notify_announcements,
            notify_replies: profileData?.user?.notifications?.notify_replies,
            notify_messages: profileData?.user?.notifications?.notify_messages,
            notify_lake_reviewed: profileData?.user?.notifications?.notify_lake_reviewed,
            notify_new_photo_on_followed_lake: profileData?.user?.notifications?.notify_new_photo_on_followed_lake,
            // notify_trip_suggestions: profileData?.user?.notifications?.notify_trip_suggestions,
            notify_mentions: profileData?.user?.notifications?.notify_mentions,
            booking_inquiry: profileData?.user?.notifications?.booking_inquiry,
        }
    }), [profileData]);

    const socialMediaDetails = useMemo(() => ({
        website: profileData?.user?.accounts?.website || '',
        facebook: profileData?.user?.accounts?.facebook || '',
        instagram: profileData?.user?.accounts?.instagram || '',
        youtube: profileData?.user?.accounts?.youtube || '',
    }), [profileData]);

    const businessProfile = useMemo(() => ({
        businessName: (businessProfileData as any)?.business?.name || '',
        businessType: (businessProfileData as any)?.business?.business_type || '',
        description: (businessProfileData as any)?.business?.description || '',
        services_offered: (businessProfileData as any)?.business?.services_offered || [],
    }), [businessProfileData]);

    const contactInformation = useMemo(() => ({
        name: (businessProfileData as any)?.business?.contact_name || '',
        email: (businessProfileData as any)?.business?.contact_email || '',
        country: (businessProfileData as any)?.business?.country || '',
        state: (businessProfileData as any)?.business?.state || '',
        phone_number: (businessProfileData as any)?.business?.phone_number || '',
        lat: (businessProfileData as any)?.business?.map_lat || null,
        long: (businessProfileData as any)?.business?.map_lng || null,
    }), [businessProfileData]);

    const trustAndEngagement = useMemo(() => ({
        certifications: (businessProfileData as any)?.business?.certifications,
        awards: (businessProfileData as any)?.business?.awards
    }), [businessProfileData]);

    const promotions = useMemo(() => ({
        promotions: (businessProfileData as any)?.business?.promotions
    }), [businessProfileData]);


    const operations = useMemo(() => ({
        open_hours: [...(businessProfileData as any)?.business?.open_hours || []],
        months_of_operation: [...(businessProfileData as any)?.business?.months_of_operation || []],
        pricing_info: (businessProfileData as any)?.business?.pricing_info,
        policies: (businessProfileData as any)?.business?.policies,
    }), [businessProfileData]);

    const media = useMemo(() => ({
        logo: (businessProfileData as any)?.business?.businessMedia?.logoMedia || {},
        thumbnail: (businessProfileData as any)?.business?.businessMedia?.thumbnailMedia || {},
        gallery_photos: (businessProfileData as any)?.business?.businessMedia?.galleryMedia || [],
        youtube_video: (businessProfileData as any)?.business?.businessMedia?.video || "",
    }), [businessProfileData]);

    return (
        <div className='md:mx-10 mx-2 my-4 flex flex-col gap-6'>

            {/* {isLoading ?
                <ScreenLoader />
                :
                <> */}
            <BusinessHeroWithProfile />
            <Container>
                <Navbar />
            </Container>
            <Container className='flex flex-col gap-6'>
                <BasicDetails profileData={businessProfile} />
                <ContactInformation profileData={contactInformation} />
                <SocialMediaAccount profileData={socialMediaDetails} />
                <Operations profileData={operations} />
                <MediaInformation profileData={media} />
                <TrustAndEngagement profileData={trustAndEngagement} />
                <Promotions profileData={promotions} />
                <SignInMethod email={user?.email as string || "jenny@kteam.com"} />
                {/* <ConnectAccount /> */}
                <EmailPreference emailPreferences={emailPreference} />
                <Settings businessSettings={businessSettings} />
                <DeactiveCard />
            </Container>
            {/* </>} */}
        </div>
    )
}

export { BusinessSettingsView };

