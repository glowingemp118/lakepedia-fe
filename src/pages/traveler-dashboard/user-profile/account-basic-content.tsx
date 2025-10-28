// import { RecentUploads } from '@/pages/public-profile/profiles/default';
import { useSelector } from 'react-redux';
import {
  BasicSettings,
  // CalendarAccounts,
  // CommunityBadges,
  // Connections,
  PersonalInfo,
  StartNow,
  Work,
} from './components';
import { selectUser } from '@/store/slices/userSlice';
import { useGetProfileQuery } from '@/store/Reducer/users';
import { ScreenLoader } from '@/components/screen-loader';
import { useMemo } from 'react';

export function AccountUserProfileContent() {

  const user = useSelector(selectUser);

  const { data, isLoading, isFetching } = useGetProfileQuery({});

  const basicSettings=useMemo(()=>({
    lastEmailLogin:data?.user?.loginHistory?.last_login_at,
    signInWith:data?.user?.last_login_with, 
    privacySettings:data?.user?.privacy,
    notificationSettings:data?.user?.notifications,
    last_login_with:data?.user?.loginHistory?.last_login_with
  }),[data]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 lg:gap-7.5">
      {
        isLoading || isFetching ?
          <ScreenLoader />
          :
          <>
            <div className="col-span-1">
              <div className="grid gap-5 lg:gap-7.5">

                <PersonalInfo user={user} />

                <BasicSettings title="Basic Settings"  basicSettings={basicSettings} />
                {/* <CommunityBadges /> */}
              </div>
            </div>
            <div className="col-span-1">
              <div className="grid gap-5 lg:gap-7.5">
                <StartNow />
                <Work />
                {/* <CalendarAccounts /> */}
                {/* <Connections url="#" /> */}
                {/* <RecentUploads title="My Files" /> */}
              </div>
            </div>
          </>
      }

    </div>
  );
}
