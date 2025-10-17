import RhfMultipleImages from "@/components/rhf/rhf-multiple-images";
import RHFTextArea from "@/components/rhf/rhf-textarea";
import RHFTextField from "@/components/rhf/rhf-textfield";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';


interface PageProps {
    lake?: {
        name?: string;
        location?: string;
        country?: string;
        images?: string[];
        description?: string;
        area?: number;
        formedYear?: number;
    }
}
const CreateLakePage = ({ lake }: PageProps) => {
    const defultValues = useMemo(() => ({
        name: lake?.name || '',
        location: lake?.location || '',
        country: lake?.country || '',
        // images: lake?.images || [],
        description: lake?.description || '',
        area: lake?.area || '',
        formedYear: lake?.formedYear || '',
        images: [] as File[],

    }), [lake]);


    const schema = zod.object({
        name: zod.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be at most 100 characters'),
        location: zod.string().min(2, 'Location must be at least 2 characters').max(100, 'Location must be at most 100 characters'),
        country: zod.string().min(2, 'Country must be at least 2 characters').max(100, 'Country must be at most 100 characters'),
        images: zod
            .array(zod.any())
            .min(1, 'At least one image is required'),

        description: zod.string().min(10, 'Description must be at least 10 characters').max(1000, 'Description must be at most 1000 characters'),
        area: zod.number().min(0, 'Area must be a positive number').max(1000000, 'Area seems too large'),
        formedYear: zod.number().min(1000, 'Formed year seems too old').max(new Date().getFullYear(), 'Formed year cannot be in the future'),
    });

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: defultValues,
    });

    const onSubmit = (data: any) => {
        //console.log(data);
    }
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const previousImages = methods.getValues('images') || [];
            const newImages = acceptedFiles.map((file) =>
                Object.assign(file, { preview: URL.createObjectURL(file) })
            );
            methods.setValue('images', [...previousImages, ...newImages]);
        },
        [methods]
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create a New Lake</CardTitle>
            </CardHeader>
            <Form {...methods}>
                <CardContent>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">

                        <RhfMultipleImages name="images" label="Upload Lake Images" onDrop={onDrop} />

                        <RHFTextField name="name" label="Lake Name" placeholder="Enter lake name" className="h-10 py-2" />

                        <RHFTextField name="location" label="Location" placeholder="Enter lake location" className="h-10 py-2" />

                        <RHFTextField name="country" label="Country" placeholder="Enter lake country"  className="h-10 py-2"/>

                        <RHFTextField name="area" label="Area (in sq km)" placeholder="Enter lake area" type="number" className="h-10 py-2" />

                        <RHFTextField name="formedYear" label="Formed Year" placeholder="Enter year when lake was formed" type="number" className="h-10 py-2" />

                        <RHFTextArea name="description" label="Description" placeholder="Enter lake description" textarea rows={4} />
                        <CardFooter>
                            <div className="flex justify-end items-center w-full gap-2">
                                <Button variant={"outline"} size="lg">Cancel</Button>
                                <Button type="submit" variant={"primary"} size="lg">Create Lake</Button>
                            </div>
                        </CardFooter>
                    </form>
                </CardContent>
            </Form>
        </Card>

    )
}

export default CreateLakePage