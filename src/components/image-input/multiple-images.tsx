import { CloudUpload, CloudUploadIcon, Cross, X } from 'lucide-react';
import { FC, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloseButton } from 'react-toastify';

interface PageProps {
    value?: File[];
    onChange: (files: File[]) => void;
    onDrop: (acceptedFiles: File[]) => void;
}

export const MultiImageUpload: FC<PageProps> = ({ value = [], onChange, onDrop }) => {
    const ref = useRef<HTMLInputElement | null>(null);

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [] },
        multiple: true,
        onDrop: (acceptedFiles) => {
            onDrop(acceptedFiles);
            // Update react-hook-form field value
            if (onChange) onChange([...value, ...acceptedFiles]);
        },
    });

    const images = value.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
    );

    return (
        <>
            <div
                {...getRootProps()}
                className="border-2 border-dashed border-gray-300 p-5 rounded-md text-center cursor-pointer"
                onClick={() => ref.current?.click()}
            >
                <input {...getInputProps()} ref={ref} />
                <div className='flex justify-center mb-2'>
                     <CloudUploadIcon size={50} className=''/>
                </div>
                <p className="text-gray-600">Drag and drop images here, or click to select</p>

                <div className="mt-4 grid grid-cols-3 gap-3">
                </div>
            </div>
            <div className='flex flex-wrap gap-2 mt-4'>
                {images.map((file: any) => (
                    <div key={file.name} className="relative">
                        <img
                            key={file.name}
                            src={file.preview}
                            alt={file.name}

                            className="size-[70px] object-cover rounded-md shadow"
                        />
                        <button
                            type="button"
                            className="absolute top-1 right-1 cursor-pointer"
                            onClick={() => {
                                const newImages = images.filter((img) => img.name !== file.name);
                                onChange(newImages);
                            }}
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};
