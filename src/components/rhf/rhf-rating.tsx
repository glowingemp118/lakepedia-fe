import { Rating } from '@/partials/common/rating';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface PageProps {
    name: string;
    [x: string]: any;
}
const RhfRating:FC<PageProps> = ({name,...other}) => {

    const { control } = useFormContext();
    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <Rating
                    rating={field.value}
                    round={0}
                    {...field}
                    {...other}
                    onChange={field.onChange}
                />
            )}
        />
    )
}

export default RhfRating