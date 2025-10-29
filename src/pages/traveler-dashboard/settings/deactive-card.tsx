import ConfirmDialog from "@/components/comfirm-dialog/confirm-dialog"
import RhfCheckbox from "@/components/rhf/rhf-checkbox"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { useBoolean } from "@/hooks/use-boolean"
import { useUpdateProfileMutation } from "@/store/Reducer/users"
import { zodResolver } from "@hookform/resolvers/zod"
import { OctagonAlert } from "lucide-react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import * as z from "zod"

const DeactiveCard = () => {

    const open = useBoolean();

    const navigate = useNavigate();

    const schema = z.object({
        confirm: z.boolean().refine((val) => val === true, {
            message: "You must confirm to deactivate your account"
        })
    })

    const [updateProfile] = useUpdateProfileMutation();

    const methods = useForm({
        resolver: zodResolver(schema)
    })
    const {
        handleSubmit,
    } = methods;

    const onSubmit = async (data: any) => {
        const settings = {
            key: "status",
            status: "inactive"
        }
        const response = await updateProfile(settings);
        if (!response.error) {
            toast.success("Account deactivated successfully");
            open.onTrue();
            navigate('/auth/signin?user=traveler');
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Deactive Account</CardTitle>
            </CardHeader>
            <Form {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent>
                        <div className="bg-yellow-100 border border-dashed border-yellow-500 px-4 py-6 rounded-md">
                            <div className="flex gap-2 items-center">
                                <div>
                                    <OctagonAlert className="text-yellow-500" />
                                </div>
                                <div className="">

                                    <p className="text-md font-[500]">You Are Deactivating Your Account</p>
                                    <p>For extra security, this requires you to confirm your email or phone number when you reset your password.</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <RhfCheckbox name="confirm" label="I confirm my account deactivation" />

                        </div>


                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button variant={"destructive"} size={"lg"} type="submit">Deactivate Account</Button>
                    </CardFooter>
                </form>
            </Form>
            <ConfirmDialog
                title="Deactivate Account"
                content="Are you sure you want to deactivate your account?"
                open={open.value}
                onClose={open.onFalse}
                action={
                    <Button variant="destructive" onClick={open.onFalse}>Deactivate</Button>
                }
            />
        </Card>
    )
}

export default DeactiveCard;