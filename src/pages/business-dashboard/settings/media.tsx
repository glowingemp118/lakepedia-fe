import RhfMultipleImages from '@/components/rhf/rhf-multiple-images';
import RHFTextField from '@/components/rhf/rhf-textfield';
import RHFUploadVideo from '@/components/rhf/rhf-upload-video';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { AvatarInput } from '@/partials/common/avatar-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

interface PageProps {
    profileData: {
        logo: string;
        thumbnail: string;
        galleryPhotos: string[];
        youtubeVideo: string;
    },
}

const MediaInformation: FC<PageProps> = ({ profileData }) => {


    const defaultValues = useMemo(() => ({
        logo: profileData?.logo as string || '',
        thumbnail: profileData?.thumbnail as string || '',
        galleryPhotos: profileData?.galleryPhotos as string[] || [],
        youtubeVideo: profileData?.youtubeVideo as string || '',
    }), [profileData])

    const schema = z.object({
        logo: z.string().min(2, 'Logo is required'),
        thumbnail: z.string().min(2, 'Thumbnail is required'),
        galleryPhotos: z.array(z.string().min(2, 'Gallery photo URL is required')),
        youtubeVideo: z.string().min(2, 'YouTube video URL is required'),
    });

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

    const handleDrop = (acceptedFiles: File[]) => {
        const fileURLs = acceptedFiles.map(file => URL.createObjectURL(file));
        const currentPhotos = methods.getValues('galleryPhotos') || [];
        methods.setValue('galleryPhotos', [...currentPhotos, ...fileURLs]);
    }


    return (
        <Card >
            <CardHeader>
                <CardTitle>Media Information</CardTitle>
            </CardHeader>
            <CardContent className="">
                <Form {...methods} >
                    <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                        className="block w-full space-y-5"
                    >
                        <div className='grid gap-5 grid-cols-12'>

                            {/* Logo */}
                            <div className='md:col-span-4 col-span-12 md:block hidden'>
                                <p className='flex items-center gap-1.5 leading-none font-medium text-sm text-mono'>
                                    Logo <span className='text-red-500'>*</span>
                                </p>
                            </div>
                            <div className='md:col-span-8 col-span-12 md:mb-4'>
                                <AvatarInput name='logo' />

                            </div>


                            <div className='md:col-span-4 col-span-12 md:block hidden'>
                                <p className='flex items-center gap-1.5 leading-none font-medium text-sm text-mono'>
                                    Thumbnail <span className='text-red-500'>*</span>
                                </p>
                            </div>
                            <div className='md:col-span-8 col-span-12 md:mb-4'>
                                <AvatarInput name='thumbnail' />
                            </div>
                           

                            <div className='md:col-span-4 col-span-12 md:block hidden'>
                                <p className='flex items-center gap-1.5 leading-none font-medium text-sm text-mono'>
                                    Gallery photos <span className='text-red-500'>*</span>
                                </p>
                            </div>
                            <div className='md:col-span-8 col-span-12 md:mb-4'>
                                    <RhfMultipleImages name='galleryPhotos' onDrop={handleDrop} />
                            </div>
                            <div className='md:col-span-4 col-span-12 md:block hidden'>
                                <p className='flex items-center gap-1.5 leading-none font-medium text-sm text-mono'>
                                    YouTube video <span className='text-red-500'>*</span>
                                </p>
                        </div>

                            <div className='md:col-span-8 col-span-12 md:mb-4'>
                                <RHFUploadVideo name='youtubeVideo' />
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

export default MediaInformation