

import { Container } from "@/components/common/container";
import { Navbar } from "@/components/layouts/layout-3/components/navbar";
import { BusinessHeroWithProfile } from "../../profile/profile-hero";
import CreateLakePage from "../create-lake-page";
const CreateLakeView = () => {


    return (
        <div className='md:mx-10 mx-2 my-4 flex flex-col gap-6'>
           
            <BusinessHeroWithProfile />
            <Container>
                <Navbar />
            </Container>
            <Container className=''>
                <CreateLakePage lake={lake} />
            </Container>
        </div >
    )
}

export default CreateLakeView


const lake = {}