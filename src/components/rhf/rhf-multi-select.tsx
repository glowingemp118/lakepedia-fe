import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useFormContext } from "react-hook-form";

type Option = {
    label: string;
    value: number;
};

type Props = {
    name: string;
    label?: string;
    placeholder?: string;
    options: Option[];
    state?: string;
    setState?: (value: string) => void;
    className?: string;
    single?: boolean;
    filter?: boolean;
};

export function RHFMultiSelect({
    name,
    label,
    placeholder = "Select",
    state,
    setState,
    options,
    className,
    single,
    filter
}: Props) {
    const { control } = useFormContext();


    // console.log("options in RHFMultiSelect:", options);
    // const [searchOptions, setSearchOptions] = useState<Option[]>([]);



    // useEffect(()=>{
    //     if(options){
    //         const filteredOptions = options.filter((o) =>
    //     o.label.toLowerCase().includes(state?.toLowerCase())
    // );
    //         setSearchOptions(filteredOptions);
    //     }
    // }, [options,state]);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                let selectedValues = field.value || [];

                const handleSelect = (val: number) => {

                    const newValue = single ? [val] : selectedValues.includes(val)

                        ? selectedValues.filter((v: number) => v !== val)

                        : [...selectedValues, val];

                    if (single) selectedValues = newValue;



                    field.onChange(newValue);
                };

                return (
                    <FormItem className="w-full">
                        {label && <FormLabel>{label}</FormLabel>}
                        <FormControl>
                            <Popover modal={true}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                            "w-full justify-between h-[40px] dark:bg-input/30 border-input bg-transparent shadow-xs",
                                            !selectedValues.length && "text-muted-foreground",
                                            className,
                                        )}
                                    >
                                        <div className="flex gap-1 flex-wrap">
                                            {selectedValues.length ? (
                                                selectedValues.map((val: number) => {
                                                    const item = options.find((o) => o.value === val);
                                                    return (
                                                        <Badge
                                                            key={val}
                                                            variant="primary"
                                                            className="text-xs"
                                                        >
                                                            {item?.label}
                                                        </Badge>
                                                    );
                                                })
                                            ) : (
                                                <span>{placeholder}</span>
                                            )}
                                        </div>
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    align="start"
                                    sideOffset={4}
                                    className="w-[var(--radix-popover-trigger-width)] max-h-[300px] p-0 z-[9999]"
                                >
                                    <Command>
                                        {filter && <CommandInput placeholder="Search " className="h-9" value={state}
                                            onValueChange={(val) => setState?.(val)}
                                        />}
                                        <CommandList>
                                            <CommandEmpty>No Data found.</CommandEmpty>
                                            <CommandGroup className="w-full">
                                                {options.map((option) => (
                                                    <CommandItem
                                                        key={option.value}
                                                        onSelect={() => handleSelect(option.value)}
                                                    >
                                                        <div
                                                            className={cn(
                                                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm",
                                                                selectedValues.length > 0 && selectedValues.includes(option.value)
                                                                    ? ""
                                                                    : "opacity-50"
                                                            )}
                                                        >
                                                            {selectedValues.length > 0 && selectedValues?.includes(option.value) && (
                                                                <Check className="h-4 w-4" />
                                                            )}
                                                        </div>
                                                        {option.label}
                                                    </CommandItem>
                                                ))
                                                }
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
}


