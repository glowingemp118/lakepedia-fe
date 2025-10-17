import { Container } from '@/components/common/container';
import { Navbar } from '@/components/layouts/layout-3/components/navbar';
import { UserHeroWithProfile } from '../../profile/profile-hero';
import { AccountUserProfileContent } from '../account-basic-content';

const UserProfileView = () => {


    return (
        <div className='md:mx-10 mx-2 my-4 flex flex-col gap-6'>
            <UserHeroWithProfile />
            
            <Container>
                <Navbar />
            </Container>
            
            <Container >
                <AccountUserProfileContent />
            </Container>
        </div>
    )
}

export default UserProfileView