
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
        certifications: string;
        awards: string;
    } | null
}
const TrustAndEngagement: FC<PageProps> = ({ profileData }) => {

    const defaultValues = useMemo(() => ({
        certifications: profileData?.certifications || '',
        awards: profileData?.awards || '',
    }), [profileData]);


    const schema = z.object({
        certifications: z.string().min(2, 'Licenses or Certifications is required'),
        awards: z.string().optional(),
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
            certifications: data.certifications,
            awards: data.awards,
        }

        let response = await updateBusiness(updateBusinessProfile);

        if (!response.error) {
            toast.success("Trust and Engagement details updated successfully");
            methods.reset(defaultValues);
        }
    }
    return (
        <Card >
            <CardHeader >
                <CardTitle>Trust and Engagement</CardTitle>
            </CardHeader>
            <Form {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>

                    <CardContent className="grid gap-5 grid-cols-12">

                        {/* Licenses or Certifications */}
                        <div className="md:col-span-4 col-span-12 md:block hidden">
                            <p className="flex items-center gap-1.5 leading-none font-medium text-sm text-mono">
                                Licenses or Certifications <span className="text-red-500">*</span>
                            </p>
                        </div>
                        <div className="md:col-span-8 col-span-12 md:mb-4">
                            <RHFTextArea
                                name="certifications"
                                label="Licenses or Certifications"
                                placeholder="List any professional licenses, permits, or certifications your business holds (e.g. Tour Guide License, Safety Certification, Local Authority Permit)"
                                rows={3}
                            />
                        </div>

                        {/* Awards */}
                        <div className="md:col-span-4 col-span-12 md:block hidden">
                            <p className="flex items-center gap-1.5 leading-none font-medium text-sm text-mono">
                                Awards
                            </p>
                        </div>
                        <div className="md:col-span-8 col-span-12 md:mb-4">
                            <RHFTextArea
                                name="awards"
                                label="Awards"
                                placeholder="Mention any awards or recognitions received (e.g. 'Best Eco-Tourism Operator 2024', 'TripAdvisor Traveler’s Choice Award')"
                                rows={3}
                            />
                        </div>
                        <div className='col-span-12 flex justify-end items-center gap-2'>
                            <Button type='button' variant={"outline"}>Discard</Button>
                            <Button type='submit' variant={"primary"} size="lg" disabled={methods.formState.isSubmitting}>
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

export default TrustAndEngagement