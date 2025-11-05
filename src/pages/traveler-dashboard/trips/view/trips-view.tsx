import { Container } from '@/components/common/container'
import { Navbar } from '@/components/layouts/layout-3/components/navbar'
import { UserHeroWithProfile } from '../../profile/profile-hero'
import { ProjectColumn3Page } from '../project-column3-page'
import { useGetAllTripsQuery } from '@/store/Reducer/trip'
import { ScreenLoader } from '@/components/screen-loader'

const TripsView = () => {

    const { data, isLoading, isFetching } = useGetAllTripsQuery({});

    return (
        <div className='md:mx-10 mx-2 my-4 flex flex-col gap-6'>

            {isLoading || isFetching ?
                <ScreenLoader />
                :
                <>
                    <UserHeroWithProfile />

                    <Container>
                        <Navbar />
                    </Container>
                    <ProjectColumn3Page trips={data?.data?.trips} />
                </>
            }
        </div>
    )
}

export default TripsView