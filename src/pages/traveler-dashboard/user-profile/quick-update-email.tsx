import RHFTextField from '@/components/rhf/rhf-textfield';
import { Button } from '@/components/ui/button';
import DialogContent, { Dialog, DialogClose, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useForgotPasswordMutation } from '@/store/Reducer/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircleIcon } from 'lucide-react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import * as z from 'zod';


interface PageProps {
    open: boolean;
    onClose: () => void;
    email: string;
}
const QuickUpdateEmail: FC<PageProps> = ({ open, onClose, email }) => {

    const defaultValues = {
        email: email || '',
    }

    const navigate = useNavigate();

    const [forgotPassword] = useForgotPasswordMutation();

    const schema = z
        .object({
            email: z.string().email("Invalid email address").min(6, "Email must be at least 6 characters").max(100),
        });

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    });
    const { handleSubmit } = form;

    const handleClose = () => {
        form.reset();

        onClose();
    }

    const onSubmit = async (data: any) => {

        let response = await forgotPassword({ email: data.email });

        if (!response?.error) {
            toast.success("OTP sent to your email");
            navigate("/change-email");
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change Email</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <RHFTextField name="email" label="Current Email" placeholder='Enter Current email' disabled />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" onClick={handleClose}>Cancel</Button>
                            </DialogClose>
                            <Button type="submit"
                                disabled={form.formState.isSubmitting}
                            >{form.formState.isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <LoaderCircleIcon className="h-4 w-4 animate-spin" /> Loading...
                                </span>
                            ) : ("Save Changes")}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default QuickUpdateEmail