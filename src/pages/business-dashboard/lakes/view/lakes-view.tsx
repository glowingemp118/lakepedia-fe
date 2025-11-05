import { Container } from '@/components/common/container'
import { Navbar } from '@/components/layouts/layout-3/components/navbar'
import { ScreenLoader } from '@/components/screen-loader'
import { useGetBusinessLakesQuery } from '@/store/Reducer/lake'
import { BusinessHeroWithProfile } from '../../profile/profile-hero'
import { LakesContent } from '../lakes-basic-content'

const LakesView = () => {

    const { data, isLoading } = useGetBusinessLakesQuery({});

    return (
        <div className='md:mx-10 mx-2 my-4 flex flex-col gap-6'>
            {isLoading ?
                <ScreenLoader />
                :
                <>
                    <BusinessHeroWithProfile />
                    <Container>
                        <Navbar />
                    </Container>
                    <Container className=''>
                        <LakesContent mode="cards" lakes={data?.data?.lakes} />
                    </Container>
                </>}
        </div>
    )
}

export default LakesView