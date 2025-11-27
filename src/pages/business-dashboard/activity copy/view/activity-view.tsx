import { Container } from '@/components/common/container'
import { Navbar } from '@/components/layouts/layout-3/components/navbar'
import { BusinessHeroWithProfile } from '../../profile/profile-hero'
import ProfileBasicPage from '../profile-basic-page'

const ActivityView = () => {

   

    return (
        <div className='md:mx-10 mx-2 my-4 flex flex-col gap-6'>
          
            <BusinessHeroWithProfile/>
            <Container>
                <Navbar />
            </Container>
            <Container>
                {/* <div className="flex flex-wrap items-center gap-5 justify-between mb-7.5">
                    <h3 className="text-lg text-mono font-semibold">Activity</h3>
                </div> */}
                <ProfileBasicPage />
            </Container>
        </div>
    )
}

export default ActivityView