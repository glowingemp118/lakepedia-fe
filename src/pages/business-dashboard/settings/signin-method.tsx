import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FC } from 'react'
import { useBoolean } from '@/hooks/use-boolean';
import QuickUpdateEmail from '../profile/quick-update-email';
import QuickUpdatePassword from '../profile/quick-update-password';

interface PageProps {
    email: string;
}
const SignInMethod: FC<PageProps> = ({ email }) => {
    
    const open = useBoolean();

    const emailModal= useBoolean();
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Sign In Method</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-6'>
                <div className='flex justify-between md:flex-row flex-col items-center'>
                    <div className='flex flex-col '>
                        <p className=' font-medium '>Email Address</p>
                        <p className='text-sm text-muted-foreground font-[400]'>{email}</p>
                    </div>
                    <Button variant={"outline"} onClick={emailModal.onTrue}>Change Email</Button>
                </div>
                <div className='flex justify-between md:flex-row flex-col items-center'>
                    <div className='flex flex-col '>
                        <p className=' font-medium '>Password</p>
                        <p className='text-sm text-muted-foreground font-[400]'>**************</p>
                    </div>
                    <Button variant={"outline"} onClick={open.onTrue}>Change Password</Button>
                </div>
            </CardContent>

            <QuickUpdateEmail email={email} open={emailModal.value} onClose={emailModal.onFalse} />
            
            <QuickUpdatePassword open={open.value} onClose={open.onFalse} />
        
        </Card>
    )
}

export default SignInMethod