import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Switch } from '../ui/switch';

interface RHFSwitchProps {
    name: string;
    label: string;
    className?: string;
    description?: string;
    [x: string]: any;
}
const RHFSwitch: FC<RHFSwitchProps> = ({ name, label, description, className, ...other }) => {

    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={`${className}`} >
                    <div className='flex flex-col'>
                         <FormLabel className="text-base font-medium">{label}</FormLabel>
                    {description && <p className="text-sm text-muted-foreground mb-2">{description}</p>}
                    </div>
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