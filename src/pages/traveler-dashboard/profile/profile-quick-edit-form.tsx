import RHFSelect from '@/components/rhf/rhf-select';
import RHFSwitch from '@/components/rhf/rhf-switch';
import RHFTextField from '@/components/rhf/rhf-textfield';
import { Button } from '@/components/ui/button';
import DialogContent, { Dialog, DialogClose, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AvatarInput } from '@/partials/common/avatar-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

interface PageProps {
    profileData: {
        // photo: string;
        // firstName: string;
        // lastName: string;
        // email: string;
        country: string;
        usState: string;
        favoriteActivities: string[];
        privacy: string;
        notifications: boolean;
        photo: string;
        first_name: string;
        last_name: string;
        email: string;
        status: string;
    },
    open: boolean;
    onClose: () => void;
}

const ProfileQuickEditForm: FC<PageProps> = ({ profileData, open, onClose }) => {


    const defaultValues = useMemo(() => ({
        photo: profileData?.photo as string || null,
        firstName: profileData?.first_name as string || '',
        lastName: profileData?.last_name as string || '',
        email: profileData?.email as string || '',
        country: profileData.country || '',
        usState: profileData.usState || '',
        privacy: profileData.privacy || '',
        notification: profileData.notifications || false,

    }), [profileData])

    const schema = z.object({
        photo: z.any().nullable().optional(),
        firstName: z.string().min(3, 'First name is required'),
        lastName: z.string().min(3, 'Last name is required'),
        email: z.email('Invalid email address'),
        country: z.string().min(2, 'Country is required'),
        usState: z.string().min(2, 'State is required'),
        privacy: z.string().min(2, 'Privacy setting is required'),
        notification: z.boolean().optional(),
    })

    const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    });


    useEffect(() => {
        methods.reset(defaultValues);
    }, [defaultValues])


    const onSubmit = (data: z.infer<typeof schema>) => {
        console.log(data);
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                </DialogHeader>
                <Form {...methods} >
                    <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                        className="block w-full space-y-5"
                    >
                        <div className='flex justify-end items-center'>
                            <RHFSwitch name='notification' label='Notifications' className='flex flex-row' />
                        </div>
                        <div className='flex justify-center items-center'>
                            <AvatarInput name='photo' />
                        </div>
                        <div className='grid md:grid-cols-2 gap-5 grid-cols-1'>

                            <RHFTextField name='firstName' label='First Name' placeholder='Your first name' />

                            <RHFTextField name='lastName' label='Last Name' placeholder='Your last name' />

                            <RHFTextField name='email' label='Email' placeholder='Your email' />

                            <RHFTextField name='country' label='Country' placeholder='Your country' />

                            <RHFTextField name='usState' label='US State' placeholder='Your US state' />

                            <RHFSelect name='privacy' label='Privacy Setting' >

                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select privacy setting" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="public">Public</SelectItem>
                                    <SelectItem value="private">Private</SelectItem>
                                </SelectContent>
                            </RHFSelect>

                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>

        </Dialog>

    )
}

export default ProfileQuickEditForm