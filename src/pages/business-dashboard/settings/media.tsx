import RhfMultipleImages from '@/components/rhf/rhf-multiple-images2';
import RHFTextField from '@/components/rhf/rhf-textfield';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { AvatarInput } from '@/partials/common/avatar-input';
import { useUpdateBusinessMutation } from '@/store/Reducer/business';
import { useDeleteFileMutation, useUploadFileMutation } from '@/store/Reducer/file';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircleIcon } from 'lucide-react';
import { FC, useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import z from 'zod';

interface PageProps {
    profileData: {
        logo?: object;
        thumbnail?: object;
        gallery_photos?: any[];
        youtube_video?: string;
    },
}

const MediaInformation: FC<PageProps> = ({ profileData }) => {


    const defaultValues = useMemo(() => ({
        logo: (profileData?.logo as { url: string })?.url || "",
        thumbnail: (profileData?.thumbnail as { url: string })?.url || "",
        galleryPhotos: profileData?.gallery_photos?.map((photo) => {
            return {
                url: (photo as any)?.url,
                id: (photo as any)?.id
            }
        }) || [],
        youtubeVideo: profileData?.youtube_video || "",
    }), [profileData]);


    const [updateBusiness] = useUpdateBusinessMutation();

    const [uploadFile] = useUploadFileMutation();

    // const [deleteFile] = useDeleteFileMutation();

    const fileOrString = z.union([
        z.string().min(1, "Required"),
        z.instanceof(File),
        z.object({
            file: z.instanceof(File).optional(),
        }),
        z.object({
            id: z.string().min(1, "Required"),
            url: z.string().min(1, "Required"),
        }).strict()
    ]);

    const schema = z.object({
        logo: fileOrString,
        thumbnail: fileOrString,
        galleryPhotos: z.array(fileOrString).min(1, "At least one gallery photo is required"),
        youtubeVideo: z.string().url("Invalid YouTube video URL"),
    });

    const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    });


    useEffect(() => {
        if (defaultValues)
            methods.reset(defaultValues);
    }, [defaultValues]);

    const upload = async (file: any) => {
        const uploadResponse = await uploadFile(file as File)

        if (!uploadResponse?.error) {

            return uploadResponse?.data?.data[0]?.id;
        }

    }

    // const deleteFileHandler = async (fileId: string) => {

    //     const deleteResponse = await deleteFile(fileId);

    //     if (deleteResponse?.error) { }

    //     return deleteResponse;
    // }


    const onSubmit = async (data: any) => {

        let logo = "";

        let thumbnail = "";

        if (typeof (data.logo) !== 'string') {

            logo = await upload((data.logo as { file: File })?.file as File);
        }

        if (typeof (data.thumbnail) !== 'string') {
            thumbnail = await upload((data.thumbnail as { file: File })?.file as File);
        }


        const uploadResponses = await Promise.all(

            methods.watch("galleryPhotos")?.map(async (file: any) => {

                if (file instanceof File) {

                    const uploadResponse: any = await uploadFile((file as File));

                    return uploadResponse?.data?.data[0]?.id;

                } else {
                    return profileData?.gallery_photos?.find((photo: any) => photo.id === file.id)?.id;
                }
            })
        );


        // const removeOldPhotos = profileData?.gallery_photos?.filter((photo: any) => !uploadResponses.includes(photo.id));

        // if (removeOldPhotos && removeOldPhotos.length > 0) {
        //     await Promise.all(
        //         removeOldPhotos.map(async (photo: any) => {
        //             await deleteFileHandler(photo.id);
        //         })
        //     );

        // }

        const mediaData = {
            ...(logo && { logo }),
            ...(thumbnail && { thumbnail }),
            gallery: uploadResponses,
            ...(data.youtubeVideo && { video: data.youtubeVideo })
        }
        let response = await updateBusiness({ media: mediaData });

        if (!response.error) {
            toast.success("Media information updated successfully", {
                autoClose: 2000
            });
            // methods.reset(defaultValues);
        }
    }


    const onDrop = useCallback((acceptedFiles: any) => {

        methods.setValue("galleryPhotos", [...acceptedFiles], { shouldValidate: true });

    }, [methods.setValue]);

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
                                {methods.formState.errors.logo &&
                                    <p className="text-sm text-red-500 mt-1">
                                        Logo is required
                                    </p>
                                }
                            </div>


                            <div className='md:col-span-4 col-span-12 md:block hidden'>
                                <p className='flex items-center gap-1.5 leading-none font-medium text-sm text-mono'>
                                    Thumbnail <span className='text-red-500'>*</span>
                                </p>
                            </div>
                            <div className='md:col-span-8 col-span-12 md:mb-4'>
                                <AvatarInput name='thumbnail' />
                                {methods.formState.errors.thumbnail &&
                                    <p className="text-sm text-red-500 mt-1">
                                        Thumbnail is required
                                    </p>
                                }
                            </div>


                            <div className='md:col-span-4 col-span-12 md:block hidden'>
                                <p className='flex items-center gap-1.5 leading-none font-medium text-sm text-mono'>
                                    Gallery photos <span className='text-red-500'>*</span>
                                </p>
                            </div>
                            <div className='md:col-span-8 col-span-12 md:mb-4'>
                                {/* <RhfMultipleImages name='galleryPhotos' onDrop={onDrop} accept="image/*" /> */}
                                <RhfMultipleImages name='galleryPhotos' />
                            </div>
                            <div className='md:col-span-4 col-span-12 md:block hidden'>
                                <p className='flex items-center gap-1.5 leading-none font-medium text-sm text-mono'>
                                    YouTube video <span className='text-red-500'>*</span>
                                </p>
                            </div>

                            <div className='md:col-span-8 col-span-12 md:mb-4'>
                                {/* <RHFUploadVideo name='youtubeVideo' /> */}
                                <RHFTextField name='youtubeVideo' label='Youtube Video' placeholder='https://youtube.com' />
                                {methods.watch('youtubeVideo') &&
                                    <div className="mt-4">
                                        <iframe
                                            width="100%"
                                            height="315"
                                            style={{
                                                borderRadius: "10px"
                                            }}
                                            src={`https://www.youtube.com/embed/${methods.watch('youtubeVideo').split('v=')[1]}`}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                }

                            </div>

                        </div>

                        <div className='flex justify-end items-center gap-2'>
                            <Button variant={"outline"} type="button" size="lg"
                                onClick={() => { methods.reset(defaultValues) }}>Discard</Button>
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

export default MediaInformation