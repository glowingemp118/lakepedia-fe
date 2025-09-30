import { Container } from '@/components/common/container';
import { Navbar } from '@/components/layouts/layout-3/components/navbar';
import { AccountUserProfileContent } from './account-basic-content';
import { selectUser } from '@/store/slices/userSlice';
import { useSelector } from 'react-redux';
import { toAbsoluteUrl } from '@/lib/helpers';
import { UserHero } from '../profile/profile-hero';
import { CircleUser, Mail, MapPin } from 'lucide-react';

export function AccountUserProfilePage() {


  const user = useSelector(selectUser);
  const image = (
    <img
      src={toAbsoluteUrl('/media/avatars/300-1.png')}
      className="rounded-full border-3 border-green-500 size-[100px] shrink-0"
      alt="image"
    />
  );

  const CapitalizeRole = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  }
  console.log('user', user);


  return (
    <div className='md:mx-10 mx-2 my-4 flex flex-col gap-6'>
      <UserHero
        name={user?.name as string || "Jenny Klabber"}
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
      <Container >
        <AccountUserProfileContent />
      </Container>
    </div>
  );
}
