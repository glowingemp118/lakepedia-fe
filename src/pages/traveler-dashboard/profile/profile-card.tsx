import { Card, CardContent } from '@/components/ui/card';
import { BadgeCheck, CircleUserRound } from 'lucide-react';
import { FC } from 'react';

interface PageProps {
    profileData: {
        photo: string;
        first_name: string;
        last_name: string;
        email: string,
        status: string;
        role: string;
    };

}
const ProfileCard: FC<PageProps> = ({ profileData }) => {
    return (
        <Card className='mb-5'>
            <CardContent >
                <div className=''>
                    <div className='flex justify-between items-start mb-5'>
                        <img src={profileData.photo} alt="Profile Photo" className="md:size-35 size-10 rounded " />
                        <div className='flex-1 ml-4'>
                          <div className='flex items-center gap-2 mb-1'>
                              <h2 className='text-lg font-semibold'>{profileData.first_name} {profileData.last_name}</h2>
                            <BadgeCheck color="blue" />
                          </div>
                            <div>
                                <CircleUserRound />
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProfileCard