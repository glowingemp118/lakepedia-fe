import RHFSelect from '@/components/rhf/rhf-select';
import RHFTextField from '@/components/rhf/rhf-textfield';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { SelectItem } from '@/components/ui/select';
import { useUpdateBusinessMutation } from '@/store/Reducer/business';
import { countries } from '@/utils/data';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircleIcon } from 'lucide-react';
import { FC, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import z from 'zod';

interface PageProps {
    profileData: {
        name: string;
        email: string;
        phone_number: string;
        country: string;
        state: string;
        lat: number | null;
        long: number | null;
    },
}

const ContactInformation: FC<PageProps> = ({ profileData }) => {


    const defaultValues = useMemo(() => ({
        name: profileData?.name as string || '',
        email: profileData?.email as string || '',
        phone: profileData?.phone_number as string || '',
        country: profileData?.country as string || '',
        state: profileData?.state as string || '',
        latitude: profileData?.lat || "",
        longitude: profileData?.long || "",

    }), [profileData]);

    const [updateBusiness] = useUpdateBusinessMutation();

    const schema = z.object({
        name: z.string().min(2, 'Name is required'),
        email: z.string().email('Invalid email address'),
        country: z.string().min(3, 'Country is required'),
        state: z.string().min(3, 'State is required'),
        phone: z.string().min(10, 'Phone number is required'),
        latitude: z.string().optional(),
        longitude: z.string().optional(),

    })

    const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    });


    useEffect(() => {
        methods.reset(defaultValues);
    }, [defaultValues])


    const onSubmit = async (data: z.infer<typeof schema>) => {
        //console.log(data);
        const updateBusinessProfile = {
            contact_name: data.name,
            contact_email: data.email,
            phone_number: data.phone,
            map_lat: data.latitude,
            map_lng: data.longitude,
            country: data.country,
            state: data.state
        }
        let response = await updateBusiness(updateBusinessProfile);
        if (!response.error) {
            toast.success("Contact information updated successfully", {
                autoClose: 2000
            });
            methods.reset(defaultValues);
        }
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
                                    name='name'
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
                                    name='email'
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
                            {/* <div className='md:col-span-8 col-span-12 md:mb-4'>
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
                            </div> */}
                            <div className='md:col-span-8 col-span-12 mb-4'>
                                <div className='grid md:grid-cols-2 grid-cols-1 gap-2'>

                                    <RHFSelect name='country' label='Country' placeholder='Select your country'>
                                        {countries.map((country: string) => (
                                            <SelectItem key={country} value={country}>
                                                {country}
                                            </SelectItem>
                                        ))}
                                    </RHFSelect>

                                    {/* {['United States', 'Canada', 'Australia'].includes(methods.watch("country") || "") && <RHFTextField name='usState' label='US State' placeholder='Your US state' className="py-2 h-10 " /> */}
                                    {['United States', 'Canada', 'Australia'].includes(methods.watch("country") || "") &&
                                        <RHFSelect
                                            name="usState"
                                            label={
                                                (methods.watch("country") === "United States" && "State") ||
                                                (methods.watch("country") === "Canada" && "Province or Territor") ||
                                                (methods.watch("country") === "Australia" && "State or Territory") || "State"
                                            }
                                            placeholder={
                                                (methods.watch("country") === "United States" && "Select your state") ||
                                                (methods.watch("country") === "Canada" && "Select your province or territory") ||
                                                (methods.watch("country") === "Australia" && "Select your state or territory") || "Select your state"
                                            }

                                        >
                                            {['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia,  Washington', 'West Virginia', 'Wisconsin', 'Wyoming'].map((state) => {
                                                return <SelectItem key={state} value={state}>{state}</SelectItem>

                                            })
                                            }

                                        </RHFSelect>
                                    }
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
                                    name='phone'
                                    label='Phone Number'
                                    placeholder='Enter phone number with country code'
                                    className='py-2 h-10'
                                />
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
                            <Button type='submit' variant={"primary"} size="lg" disabled={methods.formState.isSubmitting}>
                                {methods.formState.isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <LoaderCircleIcon className="h-4 w-4 animate-spin" /> Loading...
                                    </span>
                                ) : ("Save Changes")}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>

        </Card>

    )
}

export default ContactInformation