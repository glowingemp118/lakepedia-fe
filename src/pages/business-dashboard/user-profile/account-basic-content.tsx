import { selectUser } from '@/store/slices/userSlice';
import { useSelector } from 'react-redux';
import {
  BasicSettings,
  PersonalInfo,
  StartNow,
  Work,
} from './components';

export function AccountUserProfileContent() {
  const user=useSelector(selectUser);
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 lg:gap-7.5">
      <div className="col-span-1">
        <div className="grid gap-5 lg:gap-7.5">
          <PersonalInfo user={user} />
          <BasicSettings title="Basic Settings" />
          {/* <CommunityBadges /> */}
        </div>
      </div>
      <div className="col-span-1">
        <div className="grid gap-5 lg:gap-7.5">
          <StartNow />
          <Work />
        
        </div>
      </div>
      
    </div>
  );
}
