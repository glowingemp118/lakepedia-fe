import { RHFMultiSelect } from '@/components/rhf/rhf-multi-select';
import RHFSelect from '@/components/rhf/rhf-select';
import RHFTextArea from '@/components/rhf/rhf-textarea';
import RHFTextField from '@/components/rhf/rhf-textfield';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AvatarInput } from '@/partials/common/avatar-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

interface PageProps {
    profileData: {
        photo: string;
        businessName: string;
        businessType: string;
        description: string;
        serviceOffered: string[];

    },

}

const BasicDetails: FC<PageProps> = ({ profileData }) => {


    const defaultValues = useMemo(() => ({
        photo: profileData?.photo as string || null,
        businessName: profileData?.businessName as string || '',
        businessType: profileData?.businessType as string || '',
        serviceOffered: profileData?.serviceOffered as string[] || [],
        description: profileData?.description as string || '',

    }), [profileData])

    const schema = z.object({
        photo: z.any().nullable().optional(),
        businessName: z.string().min(3, 'Business name is required'),
        businessType: z.string().min(3, 'Business type is required'),
        description: z.string().min(10, 'Description should be at least 10 characters long').max(500, 'Description should be at most 500 characters long').optional(),
        serviceOffered: z.array(z.string()).optional(),
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
        <Card >
            <CardHeader>
                <CardTitle>Business Details</CardTitle>
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
                                <p className='flex items-center gap-1.5 leading-none font-medium text-sm text-mono'>Business Name <span className='text-red-500'>*</span></p>
                            </div>
                            <div className='md:col-span-8 col-span-12 md:mb-4'>
                                <div className='grid grid-cols-1 gap-2'>
                                    <RHFTextField name='businessName' label='Business Name' placeholder='Your business name' className="py-2 h-10 " />

                                </div>
                            </div>
                            <div className='md:col-span-4 col-span-12 md:block hidden'>
                                <p className='flex items-center gap-1.5 leading-none font-medium text-sm text-mono" '>Business Type <span className='text-red-500'>*</span></p>
                            </div>
                            <div className='md:col-span-8 col-span-12 md:mb-4'>

                                <RHFSelect name='businessType' label='Business Type' >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select business type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="restaurant">Restaurant</SelectItem>
                                        <SelectItem value="hotel">Hotel</SelectItem>
                                        <SelectItem value="tour_operator">Tour Operator</SelectItem>
                                    </SelectContent>
                                </RHFSelect>
                            </div>
                            <div className='md:col-span-4 col-span-12 md:block hidden'>
                                <p className='flex items-center gap-1.5 leading-none font-medium text-sm text-mono" '> Services Offered <span className='text-red-500'>*</span></p>
                            </div>
                            <div className='md:col-span-8 col-span-12 md:mb-4'>
                                <RHFMultiSelect name='serviceOffered' label='Services Offered'  options={[
                                    { label: 'Boat Rentals', value: 'boat_rentals' },
                                    { label: 'Marina', value: 'marina' },
                                    { label: 'Fishing Tours', value: 'fishing_tours' },
                                ]} placeholder="Select services offered" />

                            </div>
                            <div className='md:col-span-4 col-span-12 md:block hidden'>
                                <p className='flex items-center gap-1.5 leading-none font-medium text-sm text-mono"'>Description</p>
                            </div>
                            <div className='md:col-span-8 col-span-12 mb-4'>
                                <div className='grid  grid-cols-1 gap-2'>

                                    <RHFTextArea name="description" label="Business Description" placeholder="Write a short description about your business" rows={4} multiple />
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