import { Container } from '@/components/common/container';
import { Navbar } from '@/components/layouts/layout-3/components/navbar';
import { AccountUserProfileContent } from '../account-basic-content';
import { AdminHeroWithProfile } from '../profile-hero';

const AdminProfileView = () => {



    return (
        <div className='md:mx-10 mx-2 my-4 flex flex-col gap-6'>
            <AdminHeroWithProfile />
            <Container>
                <Navbar />
            </Container>
            <Container >
                <AccountUserProfileContent />
            </Container>
        </div>
    )
}

export default AdminProfileView