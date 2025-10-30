// import React, { FC } from 'react';
// import { useFormContext } from 'react-hook-form';
// import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
// import { Select } from '../ui/select';

// interface RHFSelectProps {
//     name: string;
//     label: string;
//     children: React.ReactNode;
// }
// const RHFSelect: FC<RHFSelectProps> = ({ name, label, children }) => {
//     const { control } = useFormContext();
//     return (
//         <FormField
//             control={control}
//             name={name}
//             render={({ field }) => (
//                 <FormItem>
//                     <FormLabel>{label}</FormLabel>
//                     <FormControl>
//                         <Select {...field} defaultValue={field.value}>
//                             {children}
//                         </Select>
//                     </FormControl>
//                     <FormMessage />
//                 </FormItem>
//             )}
//         />
//     )
// }

// export default RHFSelect


import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue
} from '../ui/select';

interface RHFSelectProps {
  name: string;
  label: string;
  children: React.ReactNode;
  placeholder?: string;
}

const RHFSelect: FC<RHFSelectProps> = ({ name, label, children, placeholder }) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>{children}</SelectContent>
            </Select>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RHFSelect;
