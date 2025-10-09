import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { MultiImageUpload } from '../image-input/multiple-images';

interface PageProps {
  name: string;
  label?: string;
  onDrop: (acceptedFiles: File[]) => void;
  [key: string]: any;
}

const RhfMultipleImages: FC<PageProps> = ({ name, label, onDrop ,...other}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col gap-2">
          {label && <label className="font-medium">{label}</label>}
          <MultiImageUpload {...field} onDrop={onDrop} {...other} />
        </div>
      )}
    />
  );
};

export default RhfMultipleImages;
