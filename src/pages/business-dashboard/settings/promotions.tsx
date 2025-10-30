
import RHFTextArea from '@/components/rhf/rhf-textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { useUpdateBusinessMutation } from '@/store/Reducer/business'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircleIcon } from 'lucide-react'
import { FC, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'

interface PageProps {
    profileData?: {
        promotions: string;
    } | null
}
const Promotions: FC<PageProps> = ({ profileData }) => {

    const defaultValues = useMemo(() => ({
        promotions: profileData?.promotions || '',
    }), [profileData]);


    const schema = z.object({
        promotions: z.string().min(2, 'Promotions is required'),
    });

    const [updateBusiness] = useUpdateBusinessMutation();

    const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues
    });

    useEffect(() => {
        methods.reset(defaultValues);
    }, [defaultValues])

    const onSubmit = async (data: z.infer<typeof schema>) => {

        const updateBusinessProfile = {
            promotions: data.promotions,
        }
        let response = await updateBusiness(updateBusinessProfile);

        if (!response.error) {
            toast.success("Promotions details updated successfully");
            methods.reset(defaultValues);
        }
    }
    return (
        <Card >
            <CardHeader >
                <CardTitle>Commercial</CardTitle>
            </CardHeader>
            <Form {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>

                    <CardContent className="grid gap-5 grid-cols-12">

                        {/* Promotions */}
                        <div className="md:col-span-4 col-span-12 md:block hidden">
                            <p className="flex items-center gap-1.5 leading-none font-medium text-sm text-mono">
                                Promotions <span className="text-red-500">*</span>
                            </p>
                        </div>
                        <div className="md:col-span-8 col-span-12 md:mb-4">
                            <RHFTextArea
                                name="promotions"
                                label="Promotions"
                                placeholder="List any promotions your business is currently running (e.g. '20% off all tours', 'Free lunch with every booking')"
                                rows={3}
                            />
                        </div>

                        <div className='col-span-12 flex justify-end items-center gap-2'>
                            <Button type='button' variant={"outline"}>Discard</Button>
                            <Button type='submit' variant={"primary"}>
                                {methods.formState.isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <LoaderCircleIcon className="h-4 w-4 animate-spin" /> Loading...
                                    </span>
                                ) : ("Save Changes")}
                            </Button>
                        </div>

                    </CardContent>
                </form>
            </Form>
        </Card>


    )
}

export default Promotions;