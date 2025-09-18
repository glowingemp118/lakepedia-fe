import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Select, SelectContent } from '../ui/select';

interface RHFSelectProps {
    name: string;
    label: string;
    children: React.ReactNode;
}
const RHFSelect: FC<RHFSelectProps> = ({ name, label, children }) => {
    const { control } = useFormContext();
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Select {...field} defaultValue={field.value}>
                            {children}
                        </Select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default RHFSelect