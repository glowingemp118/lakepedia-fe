import RHFSelect from '@/components/rhf/rhf-select';
import RHFTextField from '@/components/rhf/rhf-textfield';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { SelectItem } from '@/components/ui/select';
import { AvatarInput } from '@/partials/common/avatar-input';
import { useUploadFileMutation } from '@/store/Reducer/file';
import { useUpdateProfileMutation } from '@/store/Reducer/users';
import { setUser } from '@/store/slices/userSlice';
import { countries, stateData } from '@/utils/data';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircleIcon } from 'lucide-react';
import { FC, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
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

    const dispatch = useDispatch();

    const [updateProfile] = useUpdateProfileMutation();

    const [uploadFile] = useUploadFileMutation();


    const schema = z.object({
        photo: z.any().nullable().optional(),
        firstName: z.string().min(3, 'First name is required'),
        lastName: z.string().min(3, 'Last name is required'),
        email: z.email('Invalid email address'),
        country: z.string().min(3, 'Country is required'),
        usState: z.string().optional()
    })

    const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    });


    useEffect(() => {
        methods.reset(defaultValues);
    }, [defaultValues])


    const onSubmit = async (data: z.infer<typeof schema>) => {

        if (['United States', 'Canada', 'Australia'].includes(data.country) && !data.usState) {
            methods.setError("usState", { message: "State is required" }, { shouldFocus: true });
            return;
        }

        let image = "";

        if (data.photo && typeof data.photo !== 'string') {
            const uploadResponse: any = await uploadFile(data.photo?.file as File)
            image = uploadResponse?.data?.data[0]?.id;
        }

        const profile = {
            first_name: data.firstName,
            last_name: data.lastName,
            country: data.country,
            state: data.usState,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            ...image?.length > 0 && image && { image: image },
            key: "profile"
        }
        let response: any = await updateProfile(profile);

        if (!response?.error) {
            toast.success("Profile updated successfully", { autoClose: 1500 });

            dispatch(setUser({
                ...response?.data?.data?.user,
            }));

        }
    }
    const handleReset = () => {
        methods.reset(defaultValues);
    }

    const getStates = (country: string) => {
        const states = [...stateData.filter((item) => item.country === country).map((item) => item.region)];
        return states;
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
                                            {getStates(methods.watch("country") || "").map((state) => {
                                                return <SelectItem key={state} value={state}>{state}</SelectItem>

                                            })
                                            }

                                        </RHFSelect>
                                    }
                                </div>
                            </div>

                        </div>
                        <div className='flex justify-end items-center gap-2'>
                            <Button variant={"outline"} size="lg" type='button' onClick={handleReset}>Discard</Button>
                            <Button type='submit' variant={"primary"} size="lg" disabled={methods.formState.isSubmitting}>{methods.formState.isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <LoaderCircleIcon className="h-4 w-4 animate-spin" /> Loading...
                                </span>
                            ) : ("Save Changes")}</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>

        </Card>

    )
}

export default BasicDetails