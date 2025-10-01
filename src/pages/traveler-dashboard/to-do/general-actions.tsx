import { paths } from '@/components/layouts/layout-3/components/paths';
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router';

const GeneralActions = () => {
    
    const navigate=useNavigate();

    const handleGoToCreateTrip=()=>{
        navigate(paths.travelerDashboard.trips,{state:{from:'todo'}});
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