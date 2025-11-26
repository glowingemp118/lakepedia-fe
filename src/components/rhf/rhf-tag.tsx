import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { FC, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

interface PageProps {
    name: string;
    label: string;
    placeholder?: string;
}
const RHFTag: FC<PageProps> = ({ name, label }) => {

    const [input, setInput] = useState("");
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field: { value, onChange } }) => {
                const addTag = () => {
                    const trimmed = input.trim();
                    if (trimmed && !value.includes(trimmed)) {
                        onChange([...value, trimmed]);
                    }
                    setInput("");
                };

                const removeTag = (i: number) => {
                    const updated = value.filter((_: string, idx: number) => idx !== i);
                    onChange(updated);
                };

                return (
                    <FormItem>
                        <div className="flex flex-col gap-2">
                            <FormLabel className="text-base font-medium">{label}</FormLabel>
                            <FormControl>
                                <div className="flex flex-col gap-2">

                                    <Input
                                        value={input}
                                        placeholder="Type and press Enter..."
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                addTag();
                                            }
                                        }}
                                    />

                                    <div className="flex gap-2 flex-wrap">
                                        {value.map((tag: string, i: number) => (
                                            <Badge key={i} className="flex items-center gap-1">
                                                {tag}
                                                <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(i)} />
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </div>

                    </FormItem>);
            }}
        />
    );
}


export default RHFTag