import { Button } from '@/components/ui/button';
import DialogContent, { Dialog, DialogClose, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useBoolean } from '@/hooks/use-boolean';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const defaultValues = {
    currentPassword: '',
    password: '',
    confirmPassword: '',
}
interface PageProps {
    open: boolean;
    onClose: () => void;
}
const QuickUpdatePassword: FC<PageProps> = ({ open, onClose }) => {

    const show = useBoolean();

    const schema = z
        .object({
            currentPassword: z.string().min(6, "Current password must be at least 6 characters").max(100),
            password: z.string().min(6, "New password must be at least 6 characters").max(100),
            confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters").max(100),
        })
        .refine((data) => data.password === data.confirmPassword, {
            path: ["confirmPassword"], 
            message: "Passwords do not match",
        })
        .refine((data) => data.password !== data.currentPassword, {
            path: ["password"], // attach error to new password field
            message: "New password must be different from current password",
        });

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    });
    const { handleSubmit } = form;

    const handleClose=()=>{
        form.reset();
        onClose();
    }

    const onSubmit = (data: any) => {
        console.log(data);
    };
    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="currentPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex justify-between items-center gap-2.5">
                                        <FormLabel>Current Password</FormLabel>
                                    </div>
                                    <div className="relative">
                                        <Input
                                            placeholder="Your password"
                                            type={show.value ? 'text' : 'password'} // Toggle input type
                                            {...field}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            mode="icon"
                                            onClick={show.onToggle}
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        >
                                            {show.value ? (
                                                <EyeOff className="text-muted-foreground" />
                                            ) : (
                                                <Eye className="text-muted-foreground" />
                                            )}
                                        </Button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex justify-between items-center gap-2.5">
                                        <FormLabel>New Password</FormLabel>
                                    </div>
                                    <div className="relative">
                                        <Input
                                            placeholder="Your password"
                                            type={show.value ? 'text' : 'password'} // Toggle input type
                                            {...field}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            mode="icon"
                                            onClick={show.onToggle}
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        >
                                            {show.value ? (
                                                <EyeOff className="text-muted-foreground" />
                                            ) : (
                                                <Eye className="text-muted-foreground" />
                                            )}
                                        </Button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex justify-between items-center gap-2.5">
                                        <FormLabel>Confirm Password</FormLabel>
                                    </div>
                                    <div className="relative">
                                        <Input
                                            placeholder="Your password"
                                            type={show.value ? 'text' : 'password'} // Toggle input type
                                            {...field}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            mode="icon"
                                            onClick={show.onToggle}
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        >
                                            {show.value ? (
                                                <EyeOff className="text-muted-foreground" />
                                            ) : (
                                                <Eye className="text-muted-foreground" />
                                            )}
                                        </Button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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

export default QuickUpdatePassword