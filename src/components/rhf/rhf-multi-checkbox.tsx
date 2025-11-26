import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { Checkbox } from '../ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

interface PageProps {
    name: string;
    label?: string;
    options: { label: string; value: string }[];
    [x: string]: any;
}
const RhfMultiCheckbox: FC<PageProps> = ({ name, label, options, ...other }) => {

    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="space-y-2">

                    {label && <FormLabel className="">{label}</FormLabel>}

                    <div className="flex items-center flex-wrap gap-2">

                        {options.map((option) => (

                            <FormItem key={option.value} className="flex items-center flex-row space-x-1">

                                <FormControl>

                                    <Checkbox
                                        checked={field.value?.includes(option.value)}
                                        onCheckedChange={(checked) => {
                                            const newValue = checked
                                                ? [...(field.value || []), option.value]
                                                : (field.value || []).filter((val: string) => val !== option.value);
                                            field.onChange(newValue);
                                        }}
                                        {...other}
                                    />
                                </FormControl>
                                <FormLabel className="text-sm">{option.label}</FormLabel>

                            </FormItem>
                        ))}
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default RhfMultiCheckbox