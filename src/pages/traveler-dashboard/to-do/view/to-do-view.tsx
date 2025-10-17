import { Container } from '@/components/common/container'
import { Navbar } from '@/components/layouts/layout-3/components/navbar'
import { UserHeroWithProfile } from '../../profile/profile-hero'
import GeneralActions from '../general-actions'
import TodoSection from '../to-do-section'

const TodoView = () => {


    return (
        <div className="space-y-6">
            {/* Hero Section */}
            <UserHeroWithProfile />

            <Container>
                <Navbar />
            </Container>

            <Container>
                <GeneralActions />
                <TodoSection />
            </Container>
        </div>
    )
}

export default TodoView
