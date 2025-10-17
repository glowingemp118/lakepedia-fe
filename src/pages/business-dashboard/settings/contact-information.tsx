import RHFTextField from '@/components/rhf/rhf-textfield';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

interface PageProps {
    profileData: {
        name: string;
        email: string;
        address: string;
        phone: string;
        website: string;
        facebook: string;
        instagram: string;
        youtube: string;
        mapCoordinates: {
            lat: number;
            long: number;
        } | null;
    },
}

const ContactInformation: FC<PageProps> = ({ profileData }) => {


    const defaultValues = useMemo(() => ({
        name: profileData?.name as string || '',
        email: profileData?.email as string || '',
        address: profileData?.address as string || '',
        phone: profileData?.phone as string || '',
        website: profileData?.website as string || '',
        facebook: profileData?.facebook as string || '',
        instagram: profileData?.instagram as string || '',
        youtube: profileData?.youtube as string || '',
        mapCoordinates: profileData?.mapCoordinates as { lat: number; long: number } | null || null,

    }), [profileData])

    const schema = z.object({
        name: z.string().min(2, 'Name is required'),
        email: z.string().email('Invalid email address'),
        address: z.string().min(5, 'Address is required'),
        phone: z.string().min(10, 'Phone number is required'),
        website: z.string().url('Invalid website URL').optional(),
        facebook: z.string().url('Invalid Facebook URL').optional(),
        instagram: z.string().url('Invalid Instagram URL').optional(),
        youtube: z.string().url('Invalid YouTube URL').optional(),
        mapCoordinates: z.object({
            lat: z.number().min(-90).max(90),
            long: z.number().min(-180).max(180),
        }).nullable().optional(),
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
                <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="">
                <Form {...methods} >
                    <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                        className="block w-full space-y-5"
                    >
                        <div className='grid gap-5 grid-cols-12'>

                            {/* Contact Name */}
                            <div className='md:col-span-4 col-span-12 md:block hidden'>
                                <p className='flex items-center gap-1.5 leading-none font-medium text-sm text-mono'>
                                    Contact Name <span className='text-red-500'>*</span>
                                </p>
                            </div>
                            <div className='md:col-span-8 col-span-12 md:mb-4'>
                                <RHFTextField
                                    name='contactName'
                                    label='Contact Name'
                                    placeholder='Enter contact name'
                                    className='py-2 h-10'
                                />
                            </div>

                            {/* Contact Email */}
                            <div className='md:col-span-4 col-span-12 md:block hidden'>
                                <p className='flex items-center gap-1.5 leading-none font-medium text-sm text-mono'>
                                    Contact Email <span className='text-red-500'>*</span>
                                </p>
                            </div>
                            <div className='md:col-span-8 col-span-12 md:mb-4'>
                                <RHFTextField
                                    name='contactEmail'
                                    label='Contact Email'
                                    placeholder='Enter contact email'
                                    type='email'
                                    className='py-2 h-10'
                                />
                            </div>

                            {/* Address */}
                            <div className='md:col-span-4 col-span-12 md:block hidden'>
                                <p className='flex items-center gap-1.5 leading-none font-medium text-sm text-mono'>
                                    Address <span className='text-red-500'>*</span>
                                </p>
                            </div>
                            <div className='md:col-span-8 col-span-12 md:mb-4'>
                                <div className='grid md:grid-cols-2 gap-4 grid-cols-1'>
                                    <RHFTextField
                                        name="country"
                                        label="Country"
                                        placeholder='Country'
                                        className='py-2 h-10'
                                    />
                                    <RHFTextField
                                        name="state"
                                        label="State/Province"
                                        placeholder='State/Province'
                                        className='py-2 h-10'
                                    />
                                </div>
                            </div>

                            {/* Phone Number */}
                            <div className='md:col-span-4 col-span-12 md:block hidden'>
                                <p className='flex items-center gap-1.5 leading-none font-medium text-sm text-mono'>
                                    Phone Number
                                </p>
                            </div>
                            <div className='md:col-span-8 col-span-12 md:mb-4'>
                                <RHFTextField
                                    name='phoneNumber'
                                    label='Phone Number'
                                    placeholder='Enter phone number with country code'
                                    className='py-2 h-10'
                                />
                            </div>

                            {/* Social Media Accounts */}
                            <div className='md:col-span-4 col-span-12 md:block hidden'>
                                <p className='flex items-center gap-1.5 leading-none font-medium text-sm text-mono'>
                                    Website & Social Media Accounts
                                </p>
                            </div>
                            <div className='md:col-span-8 col-span-12 md:mb-4'>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                    <RHFTextField
                                        name='website'
                                        label='Website'
                                        placeholder='https://yourwebsite.com'
                                        className='py-2 h-10'
                                    />
                                    <RHFTextField
                                        name='facebook'
                                        label='Facebook Account'
                                        placeholder='https://facebook.com/yourpage'
                                        className='py-2 h-10'
                                    />
                                    <RHFTextField
                                        name='instagram'
                                        label='Instagram Account'
                                        placeholder='https://instagram.com/yourprofile'
                                        className='py-2 h-10'
                                    />
                                    <RHFTextField
                                        name='youtube'
                                        label='YouTube Account'
                                        placeholder='https://youtube.com/@yourchannel'
                                        className='py-2 h-10 md:col-span-2'
                                    />

                                </div>
                            </div>

                            {/* Map Coordinates */}
                            <div className='md:col-span-4 col-span-12 md:block hidden'>
                                <p className='flex items-center gap-1.5 leading-none font-medium text-sm text-mono'>
                                    Map Pin Coordinates
                                </p>
                            </div>
                            <div className='md:col-span-8 col-span-12 md:mb-4'>
                                <div className='grid grid-cols-2 gap-3'>
                                    <RHFTextField
                                        name='latitude'
                                        label='Latitude'
                                        placeholder='e.g. 37.7749'
                                        className='py-2 h-10'
                                    />
                                    <RHFTextField
                                        name='longitude'
                                        label='Longitude'
                                        placeholder='e.g. -122.4194'
                                        className='py-2 h-10'
                                    />
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

export default ContactInformation