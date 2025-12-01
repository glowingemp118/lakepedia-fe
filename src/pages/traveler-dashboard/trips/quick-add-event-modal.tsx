import RHFDatePicker from '@/components/rhf/rhf-date';
import RHFTextArea from '@/components/rhf/rhf-textarea';
import RHFTextField from '@/components/rhf/rhf-textfield';
import { Button } from '@/components/ui/button';
import DialogContent, { Dialog, DialogFooter, DialogHeader, DialogOverlay, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useCreateTripEventMutation, useEditTripEventMutation } from '@/store/Reducer/trip';
import { zodResolver } from '@hookform/resolvers/zod';
import { BadgePlus, LoaderCircleIcon, Trash } from 'lucide-react';
import { FC, useEffect, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import * as z from 'zod';

interface QuickAddEventModalProps {
    currentEvent?: any;
    open: boolean;
    onClose: () => void;
}

const QucikAddEventModal: FC<QuickAddEventModalProps> = ({ currentEvent, open, onClose }) => {

    const defaultValues = useMemo(() => ({
        date: currentEvent?.date ? new Date(currentEvent?.date) : new Date(),
        day: currentEvent?.day ? currentEvent?.day : 1,
        activities: currentEvent?.activities || [{ time: "", activity: '', description: "" }],
    }), [currentEvent]);

    const { id } = useParams();

    const [createTripEvent] = useCreateTripEventMutation();

    const [editTripEvent] = useEditTripEventMutation();


    const schema = z.object({
        date: z.date().min(new Date(1900, 0, 1), "Date is required"),
        day: z.number().min(1, "Day is required"),
        activities: z.array(z.object({
            time: z.string().min(1, "Time is required").refine((val) => val.trim() !== '', {
                message: "Time cannot be empty",
            }).regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]\s?(AM|PM)?$/i, "Invalid time format"),
            activity: z.string().min(1, "Activity is required"),
            description: z.string().min(3, "Description at least 3 characters")
        })).min(1, "At least one activity is required"),
    });


    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const fields = useFieldArray<any>({
        control: form.control,
        name: "activities",
    })
    useEffect(() => {
        form.reset(defaultValues);
    }, [defaultValues]);

    const handleClose = () => {
        form.reset();
        onClose();
    }


    const onSubmit = async (data: any) => {

        const formattedData = {
            ...data,
            date: new Date(data.date).toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric"
            }).replace(/\//g, "-")
        };
        if (currentEvent) {
            
            const response = await editTripEvent({
                tripId: id as string,
                eventId: currentEvent.id,
                eventData: formattedData
            });


            if (!response.error) {
                handleClose();
                toast.success("Event updated successfully", { autoClose: 1500 });
            }
        } else {

            const response = await createTripEvent({
                tripId: id as string,
                eventData: formattedData
            });
            console.log("create event response", response);
            if (!response.error) {
                handleClose();
                toast.success("Event added successfully", { autoClose: 1500 });
            }
        }
    }
    const handleActivity = () => {

        const lastItem: any = fields.fields[fields.fields.length - 1];

        if (lastItem.time.trim() === '' || lastItem.activity.trim() === '' || lastItem.description.trim() === '') {

            form.setError(`activities.${fields.fields.length - 1}.time`, { message: "Please fill in the current activity before adding a new one." },);

            form.setError(`activities.${fields.fields.length - 1}.activity`, { message: "Please fill in the current activity before adding a new one." });

            form.clearErrors(`activities.${fields.fields.length - 1}.description`);
            return;
        }
        fields.append({ time: '', activity: '', description: '' })
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogOverlay className="fixed inset-0 flex items-center justify-center " onClick={(e) => e.stopPropagation()}>

                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto"
                >
                    <DialogHeader>
                        <DialogTitle>{currentEvent ? "Edit Event" : "Add New Event"}</DialogTitle>
                    </DialogHeader>

                    <Form {...form}>

                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                            <RHFDatePicker name="date" label="Date" />

                            <RHFTextField name="day" label="Day" type="number" placeholder="Enter Day" />

                            <div className='flex justify-end items-center w-full'> <Button type="button"
                                onClick={handleActivity}><BadgePlus /> </Button></div>

                            {fields.fields.map((field, index) => (
                                <div
                                    key={field.id}
                                    className="grid grid-cols-12 gap-3 w-full items-center "
                                >
                                    {/* Left side - inputs */}
                                    <div className={`${fields.fields.length > 1 ? "md:col-span-11" : "md:col-span-12"} md:grid md:grid-cols-2 grid-cols-1 col-span-12 gap-3`}>
                                        <RHFTextField
                                            name={`activities.${index}.time`}
                                            label="Time"
                                            placeholder="09:00"
                                            className="w-full"
                                        />
                                        <RHFTextField
                                            name={`activities.${index}.activity`}
                                            label="Activity"
                                            placeholder="Enter Activity"
                                            className="w-full md:mt-0 mt-2"
                                        />

                                    </div>
                                    {fields.fields.length > 1 && <div className=" flex justify-end items-center md:col-span-1 col-span-12 ">
                                        <Button variant="ghost" mode="icon"> <Trash color="red" size={16} onClick={() => fields.remove(index)} className='cursor-pointer' /></Button>

                                    </div>}
                                    <div className={`${fields.fields.length > 1 ? "md:col-span-11" : "md:col-span-12"}  grid-cols-1 col-span-12 gap-3`}>

                                        <RHFTextArea name={`activities.${index}.description`}
                                            label="description"
                                            placeholder='Enter Description'
                                            className=""
                                        />
                                    </div>

                                    {/* Right side - delete button */}

                                </div>
                            ))}


                            {/* </div> */}


                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                                <Button type="submit" disabled={form.formState.isSubmitting} >
                                    {form.formState.isSubmitting ? <span className="flex items-center gap-2">
                                        <LoaderCircleIcon className="h-4 w-4 animate-spin" /> Loading...
                                    </span> : currentEvent ? "Save Changes" : "Save Event"}</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </DialogOverlay>
        </Dialog>
    )
}

export default QucikAddEventModal