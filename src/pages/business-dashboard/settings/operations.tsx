import RHFSwitch from "@/components/rhf/rhf-switch";
import RHFTextArea from "@/components/rhf/rhf-textarea";
import RHFTextField from "@/components/rhf/rhf-textfield";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useUpdateBusinessMutation } from "@/store/Reducer/business";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon } from "lucide-react";
import { FC, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";

interface PageProps {
    profileData: {
        open_hours: {
            day: string;
            open: string;
            close: string;
            isOpen: boolean;
        }[];
        months_of_operation: {
            month: string;
            isOpen: boolean;
        }[];
        pricing_info: string;
        policies: string;
    } | null
}

const Operations: FC<PageProps> = ({ profileData }) => {

    const defaultValues = useMemo(() => ({
        open_hours: profileData?.open_hours || [],
        months_of_operation: profileData?.months_of_operation || [],
        pricing_info: profileData?.pricing_info || '',
        policies: profileData?.policies || '',

    }), [profileData]);


    const [updateBusiness] = useUpdateBusinessMutation();

    const schema = z.object({
        open_hours: z.array(z.object({
            day: z.string(),
            open: z.string(),
            close: z.string(),
            isOpen: z.boolean(),
        })),
        months_of_operation: z.array(z.object({
            month: z.string(),
            isOpen: z.boolean(),
        })),
        pricing_info: z.string().min(2, 'Pricing Information is required'),
        policies: z.string().min(2, 'Policies is required'),
    })

    const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    });


    useEffect(() => {

        methods.reset(defaultValues);

    }, [defaultValues]);


    const onSubmit = async (data: z.infer<typeof schema>) => {
        const updateBusinessProfile = {
            open_hours: data.open_hours,
            months_of_operation: data.months_of_operation,
            pricing_info: data.pricing_info,
            policies: data.policies,
        };
        let response = await updateBusiness(updateBusinessProfile);

        if (!response.error) {
            toast.success("Business operations updated successfully", {
                autoClose: 2000
            });
            // methods.reset(defaultValues);
        }
    }
    return (
        <Card >
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
                                {defaultValues?.open_hours?.map((schedule, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between py-0.5 last:border-b-0 "
                                    >
                                        <div className="lg:flex items-center justify-between gap-4 flex-1">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-20">
                                                {schedule.day}
                                            </span>

                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                <RHFTextField name={`open_hours.${index}.open`} placeholder="09:00 AM" className="py-1 h-8 w-full" label="" />
                                                <span className="text-xs text-gray-500 ">to</span>
                                                <RHFTextField name={`open_hours.${index}.close`} placeholder="06:00 PM" className="py-1 h-8 w-full" label="" />
                                            </div>
                                            <div>
                                                <RHFSwitch name={`open_hours.${index}.isOpen`} label="" />
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
                                    {defaultValues?.months_of_operation?.map((schedule, index) => (

                                        <div
                                            key={index}
                                            className="flex items-center justify-between py-0.5 last:border-b-0 "
                                        >
                                            <div className="lg:flex items-center justify-between gap-4 flex-1">
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-20">
                                                    {schedule.month}
                                                </span>
                                                <div>
                                                    <RHFSwitch name={`months_of_operation.${index}.isOpen`} label="" />
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
                                    name="pricing_info"
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
                            <Button type='submit' variant={"primary"} size="lg" disabled={methods.formState.isSubmitting}>
                                {methods.formState.isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <LoaderCircleIcon className="h-4 w-4 animate-spin" /> Loading...
                                    </span>
                                ) : ("Save Changes")}
                            </Button>
                        </div>


                    </form>
                </Form>
            </CardContent>

        </Card >
    )
}

export default Operations
