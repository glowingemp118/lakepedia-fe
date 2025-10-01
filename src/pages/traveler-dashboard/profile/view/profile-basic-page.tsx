import { Container } from '@/components/common/container';
import { Navbar } from '@/components/layouts/layout-3/components/navbar';
import { toAbsoluteUrl } from '@/lib/helpers';
import { UserHero } from '../profile-hero';
import {
    Mail,
    MapPin,
    Zap
} from 'lucide-react';
import { ProfileCRMContent } from '../profile-basic-content';

export function ProfileCRMPage() {
  const image = (
    <img
      src={toAbsoluteUrl('/media/avatars/300-1.png')}
      className="rounded-full border-3 border-green-500 size-[100px] shrink-0"
      alt="image"
    />
  );

  return (
    <div className='md:mx-10 mx-2 my-4 flex flex-col gap-6'>
      <UserHero
        name="Jenny Klabber"
        image={image}
        info={[
          { label: 'KeenThemes', icon: Zap },
          { label: 'SF, Bay Area', icon: MapPin },
          { email: 'jenny@kteam.com', icon: Mail },
        ]}
      />
      <Container>
        <Navbar/>    
      </Container>
      <Container>
        <ProfileCRMContent />
      </Container>
    </div>
  );
}
