import { RHFMultiSelect } from "@/components/rhf/rhf-multi-select";
import RHFSwitch from "@/components/rhf/rhf-switch";
import RHFTextArea from "@/components/rhf/rhf-textarea";
import RHFTextField from "@/components/rhf/rhf-textfield";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useUpdateBusinessMutation } from "@/store/Reducer/business";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useMemo } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
interface PageProps {
    profileData: {
        openHours: {
            day: string;
            startTime: string;
            endTime: string;
            closed: boolean;
        }[];
        monthsOfOperation: {
            month: string;
            closed: boolean;
        }[];
        pricingInformation: string;
        policies: string;
    } | null
}

const Operations: FC<PageProps> = ({ profileData }) => {

    const defaultValues = useMemo(() => ({
        openHours: profileData?.openHours || [],
        monthsOfOperation: profileData?.monthsOfOperation || [],
        pricingInformation: profileData?.pricingInformation || '',
        policies: profileData?.policies || '',

    }), [profileData]);


    const [updateBusiness] = useUpdateBusinessMutation();

    const schema = z.object({
        openHours: z.array(z.object({
            day: z.string(),
            startTime: z.string(),
            endTime: z.string(),
            closed: z.boolean(),
        })),
        monthsOfOperation: z.array(z.object({
            month: z.string(),
            closed: z.boolean(),
        })),
        pricingInformation: z.string().min(2, 'Pricing Information is required'),
        policies: z.string().min(2, 'Policies is required'),
    })

    const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    });
    const onSubmit = (data: z.infer<typeof schema>) => {
        //console.log(data);
    }
    return (
        <Card >
            {/* <h2 className="text-base font-semibold text-mono mb-4">Operations</h2> */}
            <CardHeader>
                <CardTitle>Operations</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} >

                        <div className="grid gap-5 grid-cols-12">

                            {/* Open Hours */}
                            <div className="md:col-span-4 col-span-12">
                                <p className="flex items-center gap-1.5 leading-none font-medium text-sm text-mono">
                                    Open Hours <span className="text-red-500">*</span>
                                </p>
                            </div>
                            <div className="space-y-3 md:col-span-8 col-span-12">
                                {[
                                    {
                                        day: "Monday",
                                        startTime: "09:00 AM",
                                        endTime: "11:00 PM",
                                        closed: false,
                                    },
                                    {
                                        day: "Tuesday",
                                        startTime: "03:00 PM",
                                        endTime: "06:02 PM",
                                        closed: false,
                                    },
                                    {
                                        day: "Wednesday",
                                        startTime: "01:00 PM",
                                        endTime: "11:00 PM",
                                        closed: false,
                                    },
                                    {
                                        day: "Thursday",
                                        startTime: "04:00 PM",
                                        endTime: "11:15 PM",
                                        closed: false,
                                    },
                                    {
                                        day: "Friday",
                                        startTime: "09:00 AM",
                                        endTime: "11:00 PM",
                                        closed: false,
                                    },
                                    {
                                        day: "Saturday",
                                        startTime: "12:00 AM",
                                        endTime: "12:00 AM",
                                        closed: true,
                                    },
                                    {
                                        day: "Sunday",
                                        startTime: "12:00 AM",
                                        endTime: "12:00 AM",
                                        closed: true,
                                    },
                                ].map((schedule, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between py-0.5 last:border-b-0 "
                                    >
                                        <div className="lg:flex items-center justify-between gap-4 flex-1">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-20">
                                                {schedule.day}
                                            </span>

                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                <RHFTextField name={`openHours.${index}.startTime`} placeholder="09:00 AM" className="py-1 h-8 w-full" label="" />
                                                <span className="text-xs text-gray-500 ">to</span>
                                                <RHFTextField name={`openHours.${index}.endTime`} placeholder="09:00 AM" className="py-1 h-8 w-full" label="" />
                                            </div>
                                            <div>
                                                <RHFSwitch name={`openHours.${index}.closed`} label="" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="md:col-span-4 col-span-12">
                                <p className="flex items-center gap-1.5 leading-none font-medium text-sm text-mono">
                                    Months of operations <span className="text-red-500">*</span>
                                </p>
                            </div>
                            <div className="space-y-3 md:col-span-8 col-span-12 ">
                                <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
                                    {[
                                        {
                                            month: "January",
                                            closed: false,
                                        },
                                        {
                                            month: "February",
                                            closed: false,
                                        },
                                        {
                                            month: "March",
                                            closed: false,
                                        },
                                        {
                                            month: "April",
                                            closed: false,
                                        },
                                        {
                                            month: "May",
                                            closed: false,
                                        },
                                        {
                                            month: "June",
                                            closed: false,
                                        },
                                        {
                                            month: "July",
                                            closed: false,
                                        },
                                        {
                                            month: "August",
                                            closed: false,
                                        },
                                        {
                                            month: "September",
                                            closed: false,
                                        },
                                        {
                                            month: "October",
                                            closed: false,
                                        }

                                    ].map((schedule, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between py-0.5 last:border-b-0 "
                                        >
                                            <div className="lg:flex items-center justify-between gap-4 flex-1">
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-20">
                                                    {schedule.month}
                                                </span>
                                                <div>
                                                    <RHFSwitch name={`monthsofoperations.${index}.closed`} label="" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>



                            {/* Pricing Information */}
                            <div className="md:col-span-4 col-span-12 md:block hidden">
                                <p className="flex items-center gap-1.5 leading-none font-medium text-sm text-mono">
                                    Pricing Information <span className="text-red-500">*</span>
                                </p>
                            </div>
                            <div className="md:col-span-8 col-span-12 md:mb-4">
                                <RHFTextArea
                                    name="pricingInformation"
                                    label="Pricing Information"
                                    placeholder="Describe your pricing structure (e.g. hourly rates, packages, seasonal discounts, etc.)"
                                    rows={3}
                                />
                            </div>

                            {/* Policies */}
                            <div className="md:col-span-4 col-span-12 md:block hidden">
                                <p className="flex items-center gap-1.5 leading-none font-medium text-sm text-mono">
                                    Policies
                                </p>
                            </div>
                            <div className="md:col-span-8 col-span-12 md:mb-4">
                                <RHFTextArea
                                    name="policies"
                                    label="Policies"
                                    placeholder="Enter your business policies (e.g. cancellation, refund, safety rules, etc.)"
                                    rows={4}
                                />
                            </div>
                        </div>
                        <div className='flex justify-end items-center gap-2'>
                            <Button variant={"outline"} size="lg">Discard</Button>
                            <Button type='submit' variant={"primary"} size="lg">Save Changes</Button>
                        </div>


                    </form>
                </Form>
            </CardContent>

        </Card >
    )
}

export default Operations
