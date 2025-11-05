"use client"

import RHFDate from "@/components/rhf/rhf-date"
import { RHFMultiSelect } from "@/components/rhf/rhf-multi-select"
import RHFSelect from "@/components/rhf/rhf-select"
import RHFSwitch from "@/components/rhf/rhf-switch"
import RHFTextArea from "@/components/rhf/rhf-textarea"
import RHFTextField from "@/components/rhf/rhf-textfield"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { SelectItem } from "@/components/ui/select"
import { useGetAllLakesQuery } from "@/store/Reducer/lake"
import { useCreateTripMutation } from "@/store/Reducer/trip"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircleIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"

const defaultValues = {
    name: '',
    privacySetting: true,
    groupOfPeople: '2',
    description: '',
    startDate: undefined,
    endDate: undefined,
    lakes: [],
    tripType: ''
}

const tripTypes = [
    { label: 'Adult', value: 'adult' },
    { label: 'Family', value: 'family' },
    { label: 'Friends', value: 'friends' },
    { label: 'Couple', value: 'couple' },
]

const tripSchema = z.object({
    name: z.string().min(3, "Trip name is required"),
    lakes: z.array(z.number().min(1, "At least one lake must be selected")),
    tripType: z.string().min(1, "Trip type is required"),
    privacySetting: z.boolean().optional(),
    groupOfPeople: z.string().min(1, "Group of people is required"),
    description: z.string().optional(),
    startDate: z.date(),
    endDate: z.date()
})


type TripFormData = z.infer<typeof tripSchema>

interface AddTripModalProps {
    open: boolean
    onClose: () => void
}

export default function AddTripModal({ open, onClose }: AddTripModalProps) {


    const [lake, setLake] = useState('');

    const [lakes, setLakes] = useState([]);

    const [createTrip] = useCreateTripMutation();

    const { data: lakesData } = useGetAllLakesQuery({
        search: lake
    });

    const form = useForm<TripFormData>({
        resolver: zodResolver(tripSchema),
        defaultValues,

    });

    useEffect(() => {
        if (lakesData?.data?.lakes) {
            const lakeOptions = lakesData.data.lakes.map((lake: any) => {
                const label = `${lake.lake} ${typeof lake.location === "string" ? ` - ${lake.location}` : ""}`;

                return {
                    label,
                    value: lake.id
                };
            });
            setLakes(lakeOptions);
        }
    }, [lakesData]);


    const { handleSubmit, reset } = form;

    const handleFormSubmit = async (data: TripFormData) => {

        let response = await createTrip({
            name: data.name,
            start_date: data.startDate,
            end_date: data.endDate,
            group_of_people: data.groupOfPeople,
            lake_ids: data.lakes,
            type: data.tripType,
            description: data.description,
            is_private: data.privacySetting,
        });
        if (!response.error) {
            toast.success("Trip created successfully!");
            reset()
            onClose()
        }
    }


    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Add New Trip</DialogTitle>
                </DialogHeader>

                <Form {...form}>

                    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                        <div className='flex justify-end items-center'>

                            <RHFSwitch name='privacySetting' label='Privacy Setting' className='flex flex-row' />
                        </div>


                        <RHFTextField name="name" label="Trip Name" placeholder="e.g. Lake Tahoe Adventure" />

                        <RHFSelect name="tripType" label="Select Trip Type" placeholder="Select trip type">
                            {tripTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                            ))}
                        </RHFSelect>

                        <RHFMultiSelect name="lakes" label="Select Lake" className="!min-h-[40px] h-auto" placeholder="Select Lake" state={lake} setState={setLake} options={lakes} 
                        filter
                        />

                        <RHFTextField name="groupOfPeople" type="number" label="Group of People" placeholder="e.g. 2" />

                        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                            <RHFDate name="startDate" label="Start Date" />

                            <RHFDate name="endDate" label="End Date" />
                        </div>

                        <RHFTextArea name="description" label="Description" placeholder="Short description about trip..." rows={4} />

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                            <Button type="submit" disabled={form.formState.isSubmitting} >
                                {form.formState.isSubmitting ? <span className="flex items-center gap-2">
                                    <LoaderCircleIcon className="h-4 w-4 animate-spin" /> Loading...
                                </span> : "Save Trip"}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
