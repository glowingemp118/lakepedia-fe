import RhfCheckbox from '@/components/rhf/rhf-checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import * as z from "zod";

const defaultValues = {
    accountActivity: true,
    forgotPassword: false,
    changePassword: true,
}

const EmailPreference = () => {
    const schema = z.object({
        accountActivity: z.boolean(),
        forgotPassword: z.boolean(),
        changePassword: z.boolean(),
    });
    const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues
    });
    const { handleSubmit } = methods;
    const onSubmit = (data: any) => {
        //console.log(data);
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Email Preference</CardTitle>
            </CardHeader>
            <Form {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className='flex flex-col gap-4'>

                        <RhfCheckbox name="accountActivity" label="Email me about account activity" />

                        <RhfCheckbox name="forgotPassword" label="Email me if I request a password reset" />

                        <RhfCheckbox name="changePassword" label="Email me when my password is updated" />
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button variant={"outline"} size="lg">Discard</Button>
                        <Button variant="primary" type="submit">Save Changes</Button>
                    </CardFooter>
                </form>

            </Form>
        </Card>
    )
}

export default EmailPreference