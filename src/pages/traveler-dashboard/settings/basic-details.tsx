import RHFTextField from '@/components/rhf/rhf-textfield';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { AvatarInput } from '@/partials/common/avatar-input';
import { useUpdateProfileMutation } from '@/store/Reducer/users';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

interface PageProps {
    profileData: {

        country: string;
        usState: string;
        photo: string;
        first_name: string;
        last_name: string;
        email: string;
        status?: string;
    },

}

const BasicDetails: FC<PageProps> = ({ profileData }) => {

    const defaultValues = useMemo(() => ({
        photo: profileData?.photo as string || null,
        firstName: profileData?.first_name as string || '',
        lastName: profileData?.last_name as string || '',
        email: profileData?.email as string || '',
        country: profileData.country || '',
        usState: profileData.usState || '',

    }), [profileData]);

    const [updateProfile,{isLoading}] = useUpdateProfileMutation();

    const schema = z.object({
        photo: z.any().nullable().optional(),
        firstName: z.string().min(3, 'First name is required'),
        lastName: z.string().min(3, 'Last name is required'),
        email: z.email('Invalid email address'),
        country: z.string().optional(),
        usState: z.string().optional()
    })

    const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    });


    useEffect(() => {
        methods.reset(defaultValues);
    }, [defaultValues])


    const onSubmit = (data: z.infer<typeof schema>) => {
        //console.log(data);
    }

    return (
        <Card >
            <CardHeader>
                <CardTitle>Profile Details</CardTitle>
            </CardHeader>
            <CardContent className="">
                <Form {...methods} >
                    <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                        className="block w-full space-y-5"
                    >

                        <div className='grid gap-5 grid-cols-12'>
                            <div className='md:col-span-4 col-span-12 md:block hidden'>
                                <p className='flex items-center gap-1.5 leading-none font-medium text-sm text-mono"'>Avatar</p>
                            </div>
                            <div className='md:col-span-8 col-span-12 md:mb-4 '>
                                <AvatarInput name='photo' />
                            </div>
                            <div className='md:col-span-4 col-span-12 md:block hidden'>
                                <p className='flex items-center gap-1.5 leading-none font-medium text-sm text-mono'>Full Name <span className='text-red-500'>*</span></p>
                            </div>
                            <div className='md:col-span-8 col-span-12 md:mb-4'>
                                <div className='grid md:grid-cols-2 grid-cols-1 gap-2'>
                                    <RHFTextField name='firstName' label='First Name' placeholder='Your first name' className="py-2 h-10 " />

                                    <RHFTextField name='lastName' label='Last Name' placeholder='Your last name' className="py-2 h-10 " />
                                </div>
                            </div>
                            <div className='md:col-span-4 col-span-12 md:block hidden'>
                                <p className='flex items-center gap-1.5 leading-none font-medium text-sm text-mono" '>Email <span className='text-red-500'>*</span></p>
                            </div>
                            <div className='md:col-span-8 col-span-12 md:mb-4'>
                                <RHFTextField name='email' label='Email' placeholder='Your email' disabled className="py-2 h-10 " />
                            </div>
                            <div className='md:col-span-4 col-span-12 md:block hidden'>
                                <p className='flex items-center gap-1.5 leading-none font-medium text-sm text-mono"'>Location</p>
                            </div>
                            <div className='md:col-span-8 col-span-12 mb-4'>
                                <div className='grid md:grid-cols-2 grid-cols-1 gap-2'>

                                    <RHFTextField name='country' label='Country' placeholder='Your country' className="py-2 h-10 " />

                                    <RHFTextField name='usState' label='US State' placeholder='Your US state' className="py-2 h-10 " />

                                </div>
                            </div>

                        </div>
                        <div className='flex justify-end items-center gap-2'>
                            <Button variant={"outline"} size="lg">Discard</Button>
                            <Button type='submit' variant={"primary"} size="lg">Save Changes</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>

        </Card>

    )
}

export default BasicDetails