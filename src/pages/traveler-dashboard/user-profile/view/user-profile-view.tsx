import { Container } from '@/components/common/container';
import { Navbar } from '@/components/layouts/layout-3/components/navbar';
import { ScreenLoader } from '@/components/screen-loader';
import { useGetProfileQuery } from '@/store/Reducer/users';
import { useMemo } from 'react';
import { UserHeroWithProfile } from '../../profile/profile-hero';
import { AccountUserProfileContent } from '../account-basic-content';

const UserProfileView = () => {

    const { data, isLoading, isFetching } = useGetProfileQuery({});

    const basicSettings = useMemo(() => ({
        lastEmailLogin: data?.user?.loginHistory?.last_login_at,
        signInWith: data?.user?.last_login_with,
        privacySettings: data?.user?.privacy,
        notificationSettings: data?.user?.notifications,
        last_login_with: data?.user?.loginHistory?.last_login_with
    }), [data]);    


    return (
        <div className='md:mx-10 mx-2 my-4 flex flex-col gap-6'>
            {isLoading || isFetching ?
                <ScreenLoader />

                : <>
                    <UserHeroWithProfile />
                    <Container>
                        <Navbar />
                    </Container>
                    <Container>
                        <AccountUserProfileContent basicSettings={basicSettings} />
                    </Container>
                </>}
        </div>
    )
}

export default UserProfileView