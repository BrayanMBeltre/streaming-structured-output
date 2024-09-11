import type { FieldValues, UseControllerProps } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input, type InputProps } from "../ui/input";

type Props<T extends FieldValues> = UseControllerProps<T> &
  InputProps & {
    label?: string;
    description?: string;
  };

export function RHFInput<T extends FieldValues>({
  name,
  control,
  label,
  description,
  ...props
}: Props<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} {...props} value={field.value || ""} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
