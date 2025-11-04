import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { MultiImageUpload } from '../image-input/multiple-images';

interface PageProps {
  name: string;
  label?: string;
  [key: string]: any;
}

const RhfMultipleImages: FC<PageProps> = ({ name, onDrop, label, ...other }) => {
  const { control, formState } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col gap-2">

          {label && <label className="font-medium">{label}</label>}

          <MultiImageUpload {...field} name={name} onDrop={onDrop} {...other} />

          {formState.errors[name] && (
            <p className="text-sm text-red-500 mt-1">
              {formState.errors[name]?.message as string}
            </p>
          )}
        
        </div>
      )}
    />
  );
};

export default RhfMultipleImages;
