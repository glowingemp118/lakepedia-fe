import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';

interface RHFTextAreaProps {
    name: string;
    label: string;
    placeholder?: string;
    [key: string]: any;
}
const RHFTextArea: FC<RHFTextAreaProps> = ({ name, label, placeholder, ...other }) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Textarea  placeholder={placeholder} {...field} {...other} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default RHFTextArea