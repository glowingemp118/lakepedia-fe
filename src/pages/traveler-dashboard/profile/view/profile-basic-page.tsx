import { Container } from '@/components/common/container';
import { Navbar } from '@/components/layouts/layout-3/components/navbar';
import { ProfileCRMContent } from '../profile-basic-content';
import { UserHeroWithProfile } from '../profile-hero';

export function ProfileCRMPage() {
 

  return (
    <div className='md:mx-10 mx-2 my-4 flex flex-col gap-6'>
    
      <UserHeroWithProfile />
      <Container>
        <Navbar />
      </Container>
      <Container>
        <ProfileCRMContent />
      </Container>
    </div>
  );
}
