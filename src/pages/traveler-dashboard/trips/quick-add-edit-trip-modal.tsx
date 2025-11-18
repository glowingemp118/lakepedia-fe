"use client"

import RHFDate from "@/components/rhf/rhf-date"
import RHFSelect from "@/components/rhf/rhf-select"
import RHFSwitch from "@/components/rhf/rhf-switch"
import RHFTextArea from "@/components/rhf/rhf-textarea"
import RHFTextField from "@/components/rhf/rhf-textfield"
import { Button } from "@/components/ui/button"
import RHFCustomDropdown from '@/components/rhf/rhf-custom-dropdown';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { SelectItem } from "@/components/ui/select"
import { useGetAllLakesQuery } from "@/store/Reducer/lake"
import { useCreateTripMutation, useUpdateTripMutation } from "@/store/Reducer/trip"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircleIcon } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"


const tripTypes = [
    { label: 'Adult', value: 'adult' },
    { label: 'Family', value: 'family' },
    { label: 'Friends', value: 'friends' },
    { label: 'Couple', value: 'couple' },
]

interface AddTripModalProps {
    open: boolean
    onClose: () => void,
    currentTrip: any
}

export default function QuickAddEditTripModal({ open, onClose, currentTrip }: AddTripModalProps) {

    const defaultValues = useMemo(() => ({
        name: currentTrip?.name || '',
        privacySetting: currentTrip?.is_private || true,
        groupOfPeople: currentTrip?.group_of_people || '2',
        description: currentTrip?.description || '',
        startDate: currentTrip?.start_date ? new Date(currentTrip?.start_date) : new Date(),
        endDate: currentTrip?.start_date ? new Date(currentTrip?.end_date) : new Date(),
        lakes: currentTrip?.lakes?.map((lake: any) => lake.id),
        budget: currentTrip?.budget || '',
        tripType: currentTrip?.type || ''
    }), [currentTrip]);


    const [lake, setLake] = useState('');

    const [lakes, setLakes] = useState([]);

    const [createTrip] = useCreateTripMutation();

    const [updateTrip] = useUpdateTripMutation();

    const { data: lakesData, isLoading, isFetching } = useGetAllLakesQuery({
        search: lake
    });


    const tripSchema = z.object({
        name: z.string().min(3, "Trip name is required"),
        lakes: z.array(z.number().min(1, "At least one lake must be selected")),
        tripType: z.string().min(1, "Trip type is required"),
        privacySetting: z.boolean().optional(),
        groupOfPeople: z.string().min(1, "Group of people is required"),
        description: z.string().optional(),
        startDate: z.date(),
        endDate: z.date(),
        budget: z.string().optional(),
    })
    type TripFormData = z.infer<typeof tripSchema>

    const form = useForm<TripFormData>({
        resolver: zodResolver(tripSchema),
        defaultValues,

    });

    useEffect(() => {
        form.reset(defaultValues);
    }, [defaultValues])

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

        if (currentTrip) {

            let response = await updateTrip({
                id: currentTrip.id,
                data: {
                    name: data.name,
                    start_date: data.startDate,
                    end_date: data.endDate,
                    group_of_people: data.groupOfPeople,
                    lake_ids: data.lakes,
                    type: data.tripType,
                    description: data.description,
                    is_private: data.privacySetting,
                    budget: data.budget,
                }
            });
            if (!response.error) {
                toast.success("Trip updated successfully!", { autoClose: 1500 });
                reset()
                onClose()
            }

        } else {

            let response = await createTrip({
                name: data.name,
                start_date: data.startDate,
                end_date: data.endDate,
                group_of_people: data.groupOfPeople,
                lake_ids: data.lakes,
                type: data.tripType,
                description: data.description,
                is_private: data.privacySetting,
                budget: data.budget,
            });
            if (!response.error) {
                toast.success("Trip created successfully!", { autoClose: 1500 });
                reset()
                onClose()
            }
        }
    }


    return (
        <Dialog open={open} onOpenChange={onClose} >
            <DialogOverlay className="fixed inset-0 flex items-center justify-center " onClick={(e) => e.stopPropagation()}>

                <DialogContent className="max-w-lg"
                >
                    <DialogHeader>
                        <DialogTitle>{currentTrip ? "Edit Trip" : "Add New Trip"}</DialogTitle>
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

                            <RHFCustomDropdown
                                name="lakes"
                                label="Lakes"
                                placeholder="Select Lakes"
                                options={lakes}
                                loading={isLoading || isFetching}
                                onSearch={(v: string) => setLake(v)}
                                alreadySelected={currentTrip?.lakes}

                                chip={true}
                            />
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">


                                <RHFTextField name="groupOfPeople" type="number" label="Group of People" placeholder="e.g. 2" />
                                <RHFTextField name="budget" type="number" label="Budget" placeholder="e.g. $500" />
                            </div>

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
                                    </span> : currentTrip ? "Save Changes" : "Save Trip"}</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </DialogOverlay>
        </Dialog>
    )
}
