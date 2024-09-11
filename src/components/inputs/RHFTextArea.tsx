import type { FieldValues, UseControllerProps } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea, type TextareaProps } from "../ui/textarea";

type Props<T extends FieldValues> = UseControllerProps<T> &
  TextareaProps & {
    label?: string;
    description?: string;
  };

export function RHFTextarea<T extends FieldValues>({
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
            <Textarea {...field} {...props} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
