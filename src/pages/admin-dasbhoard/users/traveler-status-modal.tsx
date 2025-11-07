"use client";

import RHFSelect from "@/components/rhf/rhf-select";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { useUpdateUserStatusMutation } from "@/store/Reducer/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

interface TravelerStatusModalProps {
    traveler?: {
        id: string;
        name: string;
        status: "active" | "inactive" | "deleted" | "blocked";
    }| null;
    isOpen: boolean;
    onClose: () => void;
}

export function TravelerStatusModal({
    traveler,
    isOpen,
    onClose,
}: TravelerStatusModalProps) {

    const defaultValues = useMemo(() => ({
        status: traveler?.status || "",
    }), [traveler]);

    const [updateUserStatus] = useUpdateUserStatusMutation();


    const schema = z.object({
        status: z.string().nonempty("Status is required"),
    });

    const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues
    });

    useEffect(() => {

        methods.reset(defaultValues);

    }, [defaultValues]);

    const handleSubmit = async (data: any) => {
        if (!traveler) return;

        let response = await updateUserStatus({ id: traveler.id, status: data.status });
        
        if (!response.error) {
            toast.success("Traveler status updated successfully");
            onClose();
            methods.reset(defaultValues);
        }
    
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg" aria-describedby="traveler-status-modal">
                <DialogHeader>
                    <DialogTitle>
                        Change Traveler Status
                    </DialogTitle>
                </DialogHeader>
                <Form {...methods}>

                    <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-6">

                        <div className="space-y-2">
                            <RHFSelect name="status" placeholder="Select status" label="Select Status">
                                {['active', 'inactive', 'deleted', 'blocked'].map((status) => (
                                    <SelectItem key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</SelectItem>
                                ))}
                            </RHFSelect>
                        </div>

                        <DialogFooter className="flex justify-end space-x-2 pt-2 flex-row">
                            <Button type="button" variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button type="submit">Save</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
