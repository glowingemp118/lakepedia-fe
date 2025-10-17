import RHFTextField from '@/components/rhf/rhf-textfield';
import { Button } from '@/components/ui/button';
import DialogContent, { Dialog, DialogClose, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as z from 'zod';

const defaultValues = {
    email: '',
}
interface PageProps {
    open: boolean;
    onClose: () => void;
}
const QuickUpdateEmail: FC<PageProps> = ({ open, onClose }) => {

    const navigate = useNavigate();
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
    
    const onSubmit = (data: any) => {
    
        navigate("/auth/change-email");
    
        //console.log(data);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change Email</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <RHFTextField name="email" label="Current Email" placeholder='Enter Current email' />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" onClick={handleClose}>Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default QuickUpdateEmail