import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Switch } from '../ui/switch';

interface RHFSwitchProps {
    name: string;
    label: string;
    className?: string;
    [x: string]: any;
}
const RHFSwitch: FC<RHFSwitchProps> = ({ name, label, className, ...other }) => {

    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={`${className}`} >
                    <FormLabel className="text-base font-medium">{label}</FormLabel>
                    <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} {...other} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default RHFSwitch