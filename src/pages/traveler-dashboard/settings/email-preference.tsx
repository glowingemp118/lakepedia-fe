import RhfCheckbox from '@/components/rhf/rhf-checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect, useMemo } from 'react';
import { useForm } from "react-hook-form";
import * as z from "zod";



interface PageProps {
    emailPreferences: {
        activities_email: boolean;
        password_email: boolean;
    }
}
const EmailPreference: FC<PageProps> = ({ emailPreferences }) => {

    const defaultValues = useMemo(() => ({
        activities_email: emailPreferences?.activities_email || false,
        password_email: emailPreferences?.password_email || false,
    }), [emailPreferences]);

    const schema = z.object({
        activities_email: z.boolean(),
        password_email: z.boolean(),
    });

    const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues
    });

    const { handleSubmit } = methods;

    useEffect(() => {
        methods.reset(defaultValues);
    }, [defaultValues]);

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

                        <RhfCheckbox name="activities_email" label="Email me about account activity" />

                        <RhfCheckbox name="password_email" label="Email me if I request a password reset" />

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