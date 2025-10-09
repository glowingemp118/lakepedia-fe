import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { Checkbox } from '../ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

interface PageProps {
    name: string;
    label?: string;
    [x: string]: any;
}
const RhfCheckbox: FC<PageProps> = ({ name, label, ...other }) => {
    const { control } = useFormContext();
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-0.5 space-y-0 rounded-md">
                    <FormControl>
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            {...other}
                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-muted-foreground">
                            {label}
                        </FormLabel>
                        <FormMessage />
                    </div>
                </FormItem>
            )}
        />
    )
}

export default RhfCheckbox