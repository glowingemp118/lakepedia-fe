
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
        promotions: string;
    } | null
}
const defaultValues = {
    promotions: '',
}
const Promotions: FC<PageProps> = () => {

    const schema = z.object({
        promotions: z.string().min(2, 'Promotions is required'),
    });
    const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues
    });

    const onSubmit = (data: z.infer<typeof schema>) => {
        console.log(data);
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
                            <Button type='submit' variant={"primary"}>Save Changes</Button>
                        </div>

                    </CardContent>
                </form>
            </Form>
        </Card>


    )
}

export default Promotions;