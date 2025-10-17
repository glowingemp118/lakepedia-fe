import { Container } from '@/components/common/container'
import { Navbar } from '@/components/layouts/layout-3/components/navbar'
import { UserHeroWithProfile } from '../../profile/profile-hero'
import CampaignBasicPage from '../compaing-basic-page'

const SavedView = () => {


    return (
        <div className='md:mx-10 mx-2 my-4 flex flex-col gap-6'>
            <UserHeroWithProfile />
            <Container>
                <Navbar />
            </Container>
            <Container className='md:block hidden'>
                <CampaignBasicPage />
            </Container>
          <div className='md:hidden block'>
              <CampaignBasicPage />
          </div>
        </div>
    )
}

export default SavedView