
import RHFTextArea from '@/components/rhf/rhf-textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

interface PageProps {
    profileData?: {
        licensesCertifications: string;
        awards: string;
    } | null
}
const defaultValues = {
    licensesCertifications: '',
    awards: '',
}
const TrustAndEngagement: FC<PageProps> = () => {

    const schema = z.object({
        licensesCertifications: z.string().min(2, 'Licenses or Certifications is required'),
        awards: z.string().optional(),
    });
    const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues
    });

    const onSubmit = (data: z.infer<typeof schema>) => {
        //console.log(data);
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
                                name="licensesCertifications"
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
                            <Button type='submit' variant={"primary"}>Save Changes</Button>
                        </div>

                    </CardContent>
                </form>
            </Form>
        </Card>


    )
}

export default TrustAndEngagement