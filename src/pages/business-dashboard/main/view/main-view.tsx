import { Container } from '@/components/common/container';
import { Navbar } from '@/components/layouts/layout-3/components/navbar';
import { ProfileCRMContent } from '../../profile/profile-basic-content';
import { BusinessHeroWithProfile } from "../../profile/profile-hero";
const MainView = () => {

  return (
    <div className='md:mx-10 mx-2 my-4 flex flex-col gap-6 '>
    
      <BusinessHeroWithProfile />
      <Container>
        <Navbar />
      </Container>
      <Container>
        <ProfileCRMContent />
      </Container>
    </div>
  )
}

export default MainView