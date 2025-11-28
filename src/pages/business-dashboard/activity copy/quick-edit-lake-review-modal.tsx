import RHFDatePicker from '@/components/rhf/rhf-date';
import RhfMultipleImages from '@/components/rhf/rhf-multiple-images2';
import RHFTag from '@/components/rhf/rhf-tag';
import RHFTextArea from '@/components/rhf/rhf-textarea';
import { Button } from '@/components/ui/button';
import DialogContent, { Dialog, DialogClose, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormLabel } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Star } from 'lucide-react';
import { FC, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface QuickFishingReportModalProps {
    currentLakeReview: any;
    open: boolean;
    onClose: () => void;
}
const QuickEditLakeReviewModal: FC<QuickFishingReportModalProps> = ({ currentLakeReview, open, onClose }) => {

    const defaultValues = useMemo(() => ({
        title: currentLakeReview?.title || '',
        description: currentLakeReview?.description || '',
        date: currentLakeReview?.date ? new Date(currentLakeReview?.date) : new Date(),
        rating: currentLakeReview?.rating || 0,
        activityRating: currentLakeReview?.activityRating || 0,
        tags: currentLakeReview?.tags || [],
        photos: currentLakeReview?.photos || [],
    }), [currentLakeReview]);

    const schema = z.object({
        title: z.string().min(3, "Title must be at least 3 characters").max(100),
        description: z.string().min(10, "Description must be at least 10 characters").max(1000),
        date: z.date().min(new Date('2000-01-01'), "Date is too far in the past").max(new Date(), "Date cannot be in the future"),
        rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
        activityRating: z.number().min(1, "Activity Rating must be at least 1").max(5, "Activity Rating cannot exceed 5"),
        tags: z.array(z.string()).min(1, "At least one tag is required"),
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
            <DialogContent className='max-h-[95vh] overflow-y-auto'>
                <DialogHeader>
                    <DialogTitle>Edit Lake Review</DialogTitle>
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
                            {form.watch("rating") === 0 && (
                                <p className="-mt-0.5 text-xs font-normal text-destructive">{form.formState.errors.rating && form.formState.errors.rating.message as string}</p>
                            )}

                        </div>

                        <RHFDatePicker name="date" label="When did you go?" placeholder="Select date" />

                        <div className='flex flex-col gap-2'>
                            <FormLabel>How would you rate your Activity?</FormLabel>
                            <div>
                                {[1, 2, 3, 4, 5].map((num) => (

                                    <button
                                        key={num}
                                        type="button"
                                        className={`text-xl cursor-pointer ${num <= form.watch("activityRating") ? 'text-yellow-400' : 'text-gray-300'
                                            }`}
                                        onClick={() => { form.setValue("activityRating", num) }}
                                    >
                                        <Star className={`w-5 h-5 ${num <= form.watch("activityRating") ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} `} />
                                    </button>
                                ))}
                            </div>
                            {form.watch("activityRating") === 0 && (
                                <p className="-mt-0.5 text-xs font-normal text-destructive">{form.formState.errors.activityRating && form.formState.errors.activityRating.message as string}</p>
                            )}
                        </div>
                        <RHFTag name="tags" label="Tags" placeholder="Type and press Enter..." />

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

export default QuickEditLakeReviewModal