import { paths } from '@/components/layouts/layout-3/components/paths';
import { Button } from '@/components/ui/button'
import { LowerCaseWithUserId } from '@/lib/helpers';
import { selectUser } from '@/store/slices/userSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const GeneralActions = () => {

    const navigate = useNavigate();

    const user = useSelector(selectUser);

    const slug = LowerCaseWithUserId(user);

    const handleGoToCreateTrip = () => {
        navigate(paths.travelerDashboard.trips(slug), { state: { from: 'todo' } });
    }


    return (
        <div className='flex justify-end items-center gap-2 mb-4'>
            <Button>Submit your first lake review</Button>
            <Button>Upload lake photos</Button>
            <Button onClick={handleGoToCreateTrip} >Create your first trip</Button>
        </div>

    )
}

export default GeneralActions