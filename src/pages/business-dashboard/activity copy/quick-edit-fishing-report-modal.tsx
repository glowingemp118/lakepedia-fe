import RHFDatePicker from '@/components/rhf/rhf-date';
import RhfMultiCheckbox from '@/components/rhf/rhf-multi-checkbox';
import RhfMultipleImages from '@/components/rhf/rhf-multiple-images2';
import RHFTextArea from '@/components/rhf/rhf-textarea';
import RHFTextField from '@/components/rhf/rhf-textfield';
import { Button } from '@/components/ui/button';
import DialogContent, { Dialog, DialogClose, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Star } from 'lucide-react';
import { FC, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface QuickFishingReportModalProps {
    currentFishingReport: any;
    open: boolean;
    onClose: () => void;
}
const QuickFishingReportModal: FC<QuickFishingReportModalProps> = ({ currentFishingReport, open, onClose }) => {

    const defaultValues = useMemo(() => ({
        title: currentFishingReport?.title || '',
        description: currentFishingReport?.description || '',
        date: currentFishingReport?.date ? new Date(currentFishingReport?.date) : new Date(),
        spot: currentFishingReport?.spot || '',
        fishCount: parseInt(currentFishingReport?.count) || 0,
        rating: currentFishingReport?.rating || 0,
        fishSpecies: currentFishingReport?.fishSpecies || [],
        method: currentFishingReport?.method || "",
        photos: currentFishingReport?.photos || [],
        lure: currentFishingReport?.lure || [],

    }), [currentFishingReport]);

    const schema = z.object({
        title: z.string().min(3, "Title must be at least 3 characters").max(100),
        description: z.string().min(10, "Description must be at least 10 characters").max(1000),
        date: z.date().min(1, "Date is required"),
        spot: z.string().min(3, "Spot must be at least 3 characters").max(100),
        fishCount: z.number().min(0, "Fish count cannot be negative"),
        rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
        fishSpecies: z.array(z.string().min(1, "Fish species cannot be empty")),
        method: z.string().min(1, "Method cannot be empty"),
        lure: z.string().min(1, "Lure cannot be empty"),
        photos: z.array(z.union([
            z.instanceof(File),
            z.string()
        ])).min(1, "Photos cannot be empty"),
    });

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    });

    useEffect(() => {
        form.reset(defaultValues);
    }, [defaultValues]);

    const onSubmit = (data: any) => {
        // Handle form submission logic here
        console.log("Form submitted with data:", data);
        onClose();
    };

    const { handleSubmit } = form;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-h-[95vh] overflow-y-auto ">
                <DialogHeader>
                    <DialogTitle>Edit Fishing Report</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        <RhfMultipleImages name="photos" label="Upload Photos" />

                        <div className='flex flex-col gap-2'>
                            <FormLabel>How would you rate your experience?</FormLabel>
                            <div>
                                {[1, 2, 3, 4, 5].map((num) => (

                                    <button
                                        key={num}
                                        type="button"
                                        className={`text-xl cursor-pointer ${num <= form.watch("rating") ? 'text-yellow-400' : 'text-gray-300'
                                            }`}
                                        onClick={() => { form.setValue("rating", num) }}
                                    >
                                        <Star className={`w-5 h-5 ${num <= form.watch("rating") ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} `} />
                                    </button>
                                ))}
                            </div>
                            <FormMessage />
                        </div>

                        <RHFDatePicker name="date" label="When did you go?" placeholder="Select date" />

                        <RHFTextField name="spot" label="Spot of fishing spot" placeholder="Enter fishing spot" />

                        <RhfMultiCheckbox name="fishSpecies" label="Fish Species" options={[
                            { label: 'Salmon', value: 'salmon' },
                            { label: 'Tuna', value: 'tuna' },
                            { label: 'Trout', value: 'trout' },
                            { label: 'Cod', value: 'cod' },
                            { label: 'Mackerel', value: 'mackerel' },
                        ]} />

                        <RHFTextField name="fishCount" label="Count and size of fish caught" type="number" placeholder="Enter Count and size" />

                        <RHFTextField name='method' label='Fishing method' placeholder='Enter Fishing method' />

                        <RHFTextField name='lure' label='Lure/Bait used' placeholder='Enter Lure/Bait ' />

                        <RHFTextArea name="description" label="Write your review" placeholder="Share your experience..." textarea />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" onClick={onClose}>Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    )
}

export default QuickFishingReportModal