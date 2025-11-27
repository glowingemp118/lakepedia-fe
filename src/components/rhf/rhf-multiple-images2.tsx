import { cn } from "@/lib/utils";
import { UploadIcon, X } from "lucide-react";
import { FC, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface PageProps {
  name: string;
  label?: string;
  onDrop?: (files: File[]) => void;
}

const RhfMultipleImages: FC<PageProps> = ({ name, label, onDrop }) => {

  const { control } = useFormContext();

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <FormField
      name={name}
      control={control}
      render={({ field: { value = [], onChange } }) => {

        // ADD IMAGES
        const handleFiles = (files: FileList | null) => {

          if (!files) return;

          const newFiles = Array.from(files);

          const updated = [...value, ...newFiles];
          onChange(updated);

          if (onDrop) onDrop(newFiles);
        };

        // REMOVE IMAGE
        const removeImage = (index: number) => {
          const updated = value.filter((_: File, i: number) => i !== index);
          onChange(updated);
        };

        // DRAG OVER
        const handleDragOver = (e: React.DragEvent) => {
          e.preventDefault();
        };

        // DROP
        const handleDrop = (e: React.DragEvent) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        };

        return (
          <FormItem>
            {label && <FormLabel className="font-medium">{label}</FormLabel>}

            <FormControl>
              {/* SINGLE WRAPPER */}
              <div className="flex flex-col gap-4">

                {/* Upload Box */}
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="flex flex-col items-center gap-4 border-2 border-dashed border-muted p-4 rounded-md cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div
                    className={cn(
                      "flex h-16 w-16 items-center justify-center rounded-full bg-muted"
                    )}
                  >
                    <UploadIcon className="h-6 text-muted-foreground" />
                  </div>

                  <div className="space-y-1 text-center">
                    <h3 className="text-sm font-medium">Upload Images</h3>
                    <p className="text-xs text-muted-foreground">
                      Drag & drop or click to select (multiple allowed)
                    </p>
                  </div>

                  <Button type="button">
                    <UploadIcon className="mr-2 h-4 w-4" />
                    Select files
                  </Button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFiles(e.target.files)}
                  />
                </div>

                {/* Preview */}
                {value.length > 0 && (
                  <div className="grid md:grid-cols-5 grid-cols-3 gap-3">
                    {value.map((file: File, index: number) => {

                      const imageURL = typeof file === "string" ? file : URL.createObjectURL(file);

                      return (
                        <div
                          key={index}
                          className="relative group border rounded-md overflow-hidden"
                        >
                          <img
                            src={imageURL}
                            alt="preview"
                            className="w-full h-15 rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </FormControl>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default RhfMultipleImages;
