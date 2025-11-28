
// interface DropdownOption {
//   value: number;
//   label: string;
// }

import { FC, useEffect, useMemo, useState } from "react";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";
import { X } from "lucide-react";
import { FormLabel } from "../ui/form";

// interface Options {
//   id: number,
//   lake: string
// }

// interface Props {
//   name: string;
//   label?: string;
//   placeholder?: string;
//   options: DropdownOption[];
//   onSearch: (query: string) => void;
//   loading?: boolean;
//   chip?: boolean,
//   alreadySelected?: Options[]
// }
// import { X } from "lucide-react";
// import { FC, useEffect, useMemo, useState } from "react";
// import { Badge } from "../ui/badge";
// import { useFormContext } from "react-hook-form";
// import { Input } from "../ui/input";


// const AutocompleteTags: FC<Props> = ({ loading, options, onSearch, chip, name, alreadySelected }) => {


//   const defaultValues = useMemo(() => (alreadySelected?.map((item) => {
//     return {
//       value: item.id,
//       label: item.lake
//     }
//   })), [alreadySelected]);

//   const [search, setSearch] = useState("");

//   const [selected, setSelected] = useState<DropdownOption[]>([]);

//   const [showOptions, setShowOptions] = useState(false);

//   const { setValue } = useFormContext();

//   const filteredOptions = options.filter(
//     (opt) => !selected.find((sel) => sel.value === opt.value)
//   );


//   function useDebounce<T>(value: T, delay: number): T {
//     const [debounced, setDebounced] = useState(value);

//     useEffect(() => {
//       const t = setTimeout(() => setDebounced(value), delay);
//       return () => clearTimeout(t);
//     }, [value, delay]);

//     return debounced;
//   }

//   const debouncedSearch = useDebounce(search, 400);

//   useEffect(() => {
//     if (onSearch) onSearch(debouncedSearch);

//     if (selected) {
//       setValue(name, selected.map((s) => s.value), { shouldValidate: true })
//     }
//   }, [selected]);

//   useEffect(() => {
//     if (defaultValues) {
//       setSelected(defaultValues);
//     }
//   }, [defaultValues])


//   const handleSelect = (option: DropdownOption) => {
//     setSelected((prev) => [...prev, option]);
//     setShowOptions(false);
//   };

//   const handleRemove = (id: number) => {
//     setSelected((prev) => prev.filter((x) => x.value !== id));
//   };

//   return (
//     <div className="">
//       {/* Selected tags */}
//       <div className="flex flex-wrap gap-2 mb-3">
//         {chip && selected.map((tag) => (
//           <Badge
//             key={tag.value}
//           >
//             <span>{tag.label}</span>
//             <button
//               onClick={() => handleRemove(tag.value)}
//             >
//               <X />
//             </button>
//           </Badge>
//         ))}

//       </div>

//       {/* Search box */}
//       <div className="relative ">
//         <Input
//           value={search}
//           type="text"
//           placeholder="Search..."
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setShowOptions(true);
//           }}
//           onFocus={() => setShowOptions(true)}
//         />

//         {/* Dropdown */}
//         {showOptions && search && (
//           <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto z-10">
//             {loading ? (
//               <li className="p-2 text-gray-500 text-sm">Loading...</li>
//             ) : filteredOptions.length > 0 ? (
//               filteredOptions.map((opt) => (
//                 <li
//                   key={opt.value}
//                   onClick={() => handleSelect(opt)}
//                   className="p-2 hover:bg-blue-100 cursor-pointer"
//                 >
//                   {opt.label}
//                 </li>
//               ))
//             ) : (
//               <li className="p-2 text-gray-500 text-sm">No results found</li>
//             )}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AutocompleteTags;

interface DropdownOption {
  value: number;
  label: string;
}

interface Options {
  id: number,
  lake: string
}

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  options: DropdownOption[];
  onSearch: (query: string) => void;
  loading?: boolean;
  chip?: boolean,
  alreadySelected?: Options[],
  multiple?: boolean
}
const AutocompleteTags: FC<Props> = ({
  loading,
  options,
  onSearch,
  chip,
  name,
  alreadySelected,
  multiple = true,
  label
}) => {
  const defaultValues = useMemo(() =>
    alreadySelected?.map((item) => ({
      value: item.id,
      label: item.lake,
    })) ?? [],
    [alreadySelected]);

  const [search, setSearch] = useState("");

  const [selected, setSelected] = useState<DropdownOption[]>([]);

  const [showOptions, setShowOptions] = useState(false);

  const { setValue } = useFormContext();

  const filteredOptions = options.filter(
    (opt) => !selected.find((sel) => sel.value === opt.value)
  );

  function useDebounce<T>(value: T, delay: number): T {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
      const t = setTimeout(() => setDebounced(value), delay);
      return () => clearTimeout(t);
    }, [value, delay]);

    return debounced;
  }

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    onSearch?.(debouncedSearch);
  }, [debouncedSearch]);

  useEffect(() => {
    if (multiple) {
      setValue(
        name,
        selected.map((s) => s.value),
        { shouldValidate: true }
      );
    } else {
      setValue(name, selected[0]?.value ?? null, { shouldValidate: true });
    }
  }, [selected]);

  useEffect(() => {
    setSelected(defaultValues);
  }, [defaultValues]);

  const handleSelect = (option: DropdownOption) => {
    if (multiple) {
      setSelected((prev: any) => [...prev, option]);
    } else {
      setSelected([option]);
    }
    setShowOptions(false);
    setSearch("");
  };

  const handleRemove = (id: number) => {
    setSelected((prev: any) => prev.filter((x: any) => x.value !== id));
  };

  return (
    <div>
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {chip &&
          selected.length ===0 ? 
          <FormLabel>{label}</FormLabel>
          :selected.map((tag: any) => (
            <Badge key={tag.value}>
              <span>{tag.label}</span>
              {multiple && (
                <button onClick={() => handleRemove(tag.value)}>
                  <X />
                </button>
              )}
            </Badge>
          ))}
      </div>

      {/* Input */}
      <div className="relative">
        <Input
          value={search}
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setSearch(e.target.value);
            setShowOptions(true);
          }}
          onFocus={() => setShowOptions(true)}
        />

        {/* Dropdown */}
        {showOptions && search && (
          <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto z-10">
            {loading ? (
              <li className="p-2 text-sm text-gray-500">Loading...</li>
            ) : filteredOptions.length > 0 ? (
              filteredOptions.map((opt: any) => (
                <li
                  key={opt.value}
                  onClick={() => handleSelect(opt)}
                  className="p-2 hover:bg-blue-100 cursor-pointer"
                >
                  {opt.label}
                </li>
              ))
            ) : (
              <li className="p-2 text-sm text-gray-500">No results found</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AutocompleteTags;
