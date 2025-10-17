import { Container } from "@/components/common/container";
import { Navbar } from "@/components/layouts/layout-3/components/navbar";
import { AdminHeroWithProfile } from "../profile-hero";

export function ProfileView() {


    return (
        <div className='md:mx-10 mx-2 my-4 flex flex-col gap-6'>

            <AdminHeroWithProfile />
            <Container>
                <Navbar />
            </Container>

        </div >
    );
}


