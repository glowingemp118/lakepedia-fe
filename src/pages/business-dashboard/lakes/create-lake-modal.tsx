import RHFCustomDropdown from '@/components/rhf/rhf-custom-dropdown';
import { Button } from '@/components/ui/button';
import DialogContent, { Dialog, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useCreateLakeMutation, useGetAllLakesQuery } from '@/store/Reducer/lake';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircleIcon } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface PageProps {
    open: boolean;
    onClose: () => void;
}
const defaulValues = {
    lake: []
}
const CreateLakeModal: FC<PageProps> = ({ open, onClose }) => {

    const [createLake] = useCreateLakeMutation();

    const [lakes, setLakes] = useState([]);

    const [lake, setLake] = useState('');

    const { data, isLoading, isFetching } = useGetAllLakesQuery({
        search: lake,
    });


    const schema = z.object({
        lake: z.array(z.number().min(1, "Lake is required")),
    });

    useEffect(() => {
        if (data?.data?.lakes) {
            const lakeOptions = data.data.lakes.map((lake: any) => {
                const label = `${lake.lake} ${typeof lake.location === "string" ? ` - ${lake.location}` : ""}`;

                return {
                    label,
                    value: lake.id
                };
            });
            setLakes(lakeOptions);
        }
    }, [data]);

    const form = useForm({
        defaultValues: defaulValues,
        resolver: zodResolver(schema)
    });

    const handleSubmit = async (data: any) => {

        if(!data.lake.length) return ;

        const response = await createLake({
            lake_id: data.lake[0]
        });
        if (!response.error) {
            console.log("create lake response:", response);
            form.reset(defaulValues);
            onClose();
        }

    };
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        Add Lake
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>

                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">

                        <div className="space-y-2">

                            <RHFCustomDropdown
                                name="lake"
                                label="Lake"
                                options={lakes}
                                loading={isLoading || isFetching}
                                onSearch={(v: string) => setLake(v)}
                                chip={false}
                            />
                        </div>

                        <DialogFooter className="flex justify-end space-x-2 pt-2">
                            <Button type="button" variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={
                                form.formState.isSubmitting
                            }>{form.formState.isSubmitting ? <span className="flex items-center gap-2">
                                <LoaderCircleIcon className="h-4 w-4 animate-spin" /> Loading...
                            </span> : "Save"}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}

export default CreateLakeModal