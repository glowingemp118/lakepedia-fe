import RhfCheckbox from '@/components/rhf/rhf-checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useUpdateProfileMutation } from '@/store/Reducer/users';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircleIcon } from 'lucide-react';
import { FC, useEffect, useMemo } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
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

    const [updateProfile] = useUpdateProfileMutation();

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

    const onSubmit = async (data: any) => {
        const emailPreferences = {
            activities_email: data.activities_email,
            password_email: data.password_email,
            key: "emailPreferences"
        }
        let response: any = await updateProfile(emailPreferences);
        if (!response.error) {
            toast.success("Email preferences updated successfully");
        }
    }

    const handleReset = () => {
        methods.reset(defaultValues);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Email Preference</CardTitle>
            </CardHeader>
            <Form {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className='flex flex-col gap-4'>

                        <RhfCheckbox name="activities_email" label="Email me about account activity" className="cursor-pointer" />

                        <RhfCheckbox name="password_email" label="Email me if I request a password reset" className="cursor-pointer" />

                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button variant={"outline"} type='button' onClick={handleReset} size="lg">Discard</Button>
                        <Button variant="primary" type="submit"
                            disabled={methods.formState.isSubmitting}
                        >
                            {methods.formState.isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <LoaderCircleIcon className="h-4 w-4 animate-spin" /> Loading...
                                </span>
                            ) : ("Save Changes")}
                        </Button>
                    </CardFooter>
                </form>

            </Form>
        </Card>
    )
}

export default EmailPreference