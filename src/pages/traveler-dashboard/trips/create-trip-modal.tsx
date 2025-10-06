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
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const defaultValues = {
    name: '',
    privacySetting: true,
    groupOfPeople: 2,
    description: '',
    startDate: undefined,
    endDate: undefined,
    lake: '',
    tripType: ''
}

const tripTypes = [
    { label: 'Adult', value: 'adult' },
    { label: 'Family', value: 'family' },
    { label: 'Friends', value: 'friends' },
    { label: 'Couple', value: 'couple' },
]
const lakes = [
    { label: 'Lake Tahoe', value: 'lake_tahoe' },
    { label: 'Crater Lake', value: 'crater_lake' }
]

const tripSchema = z.object({
    name: z.string().min(3, "Trip name is required"),
    lake: z.string().min(1, "Lake is required"),
    tripType: z.string().min(1, "Trip type is required"),
    privacySetting: z.boolean().optional(),
    groupOfPeople: z.number().min(2, "At least one person is required"),
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

    const form = useForm<TripFormData>({
        resolver: zodResolver(tripSchema),
        defaultValues,

    })
    const { handleSubmit,reset } = form;

    const handleFormSubmit = (data: TripFormData) => {
        // onSubmit(data)
        reset()
        onClose()
    }

    console.log("tripType", form.getValues('tripType'))

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

                        <RHFSelect name="tripType" label="Select Trip Type" >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select trip type" />
                            </SelectTrigger>
                            <SelectContent>
                                {tripTypes.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </RHFSelect>

                        <RHFMultiSelect name="lake" label="Select Lake" placeholder="Select Lake" options={lakes} />

                        <RHFTextField name="groupOfPeople" label="Group of People" placeholder="e.g. 2" />

                        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                            <RHFDate name="startDate" label="Start Date" />

                            <RHFDate name="endDate" label="End Date" />
                        </div>

                        <RHFTextArea name="description" label="Description" placeholder="Short description about trip..." rows={4} />

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                            <Button type="submit">Save Trip</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
