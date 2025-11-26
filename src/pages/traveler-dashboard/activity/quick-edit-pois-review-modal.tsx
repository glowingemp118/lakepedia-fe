import RHFDatePicker from '@/components/rhf/rhf-date';
import RhfMultipleImages from '@/components/rhf/rhf-multiple-images2';
import RHFTag from '@/components/rhf/rhf-tag';
import RHFTextArea from '@/components/rhf/rhf-textarea';
import { Button } from '@/components/ui/button';
import DialogContent, { Dialog, DialogClose, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Star } from 'lucide-react';
import { FC, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface QuickFishingReportModalProps {
    currentPOIsReview: any;
    open: boolean;
    onClose: () => void;
}
const QuickEditPOIReviewModal: FC<QuickFishingReportModalProps> = ({ currentPOIsReview, open, onClose }) => {

    const defaultValues = useMemo(() => ({
        title: currentPOIsReview?.title || '',
        description: currentPOIsReview?.description || '',
        date: currentPOIsReview?.date || '',
        rating: currentPOIsReview?.rating || 0,
        activityRating: currentPOIsReview?.activityRating || 0,
        tags: currentPOIsReview?.tags || [],
        photos: currentPOIsReview?.photos || [],
    }), [currentPOIsReview]);

    const schema = z.object({
        title: z.string().min(3, "Title must be at least 3 characters").max(100),
        description: z.string().min(10, "Description must be at least 10 characters").max(1000),
        date: z.string().min(1, "Date is required"),
        rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
        activityRating: z.number().min(1, "Activity Rating must be at least 1").max(5, "Activity Rating cannot exceed 5"),
        tags: z.array(z.string().min(1, "Tags cannot be empty")),
        photos: z.array(z.string().min(1, "Photos cannot be empty")),
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
            <DialogContent className='overflow-y-auto max-h-[95vh]'>
                <DialogHeader>
                    <DialogTitle>Edit POIs Review</DialogTitle>
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
                                        <Star className={`w-5 h-5 ${num <= form.watch("rating") ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} `} />
                                    </button>
                                ))}
                            </div>
                            <FormMessage />
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

export default QuickEditPOIReviewModal