import { Container } from '@/components/common/container'
import { Navbar } from '@/components/layouts/layout-3/components/navbar'
import { ProfileCRMContent } from '../../profile/profile-basic-content'
import { BusinessHeroWithProfile } from '../../profile/profile-hero'

const BusinessView = () => {



    return (
        <div>
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

export default BusinessView