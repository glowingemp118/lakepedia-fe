import { Rating } from '@/partials/common/rating';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

interface PageProps {
    name: string;
    label?: string;
    [x: string]: any;
}
const RhfRating: FC<PageProps> = ({ name, label, ...other }) => {

    const { control } = useFormContext();
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && <FormLabel>{label}</FormLabel>}

                    <FormControl>
                        <Rating
                            rating={field.value}
                            round={0}
                            {...field}
                            {...other}
                            onChange={field.onChange}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default RhfRating