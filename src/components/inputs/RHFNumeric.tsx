import type { KeyboardEvent } from "react";
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

const validateNumber = (event: KeyboardEvent<HTMLInputElement>) => {
  if (
    !(
      (event.key >= "0" && event.key <= "9") ||
      event.key === "Backspace" ||
      event.key === "Delete" ||
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight" ||
      event.key === "Tab" ||
      event.key === "Enter"
    )
  ) {
    event.preventDefault();
  }
};

export function RHFNumeric<T extends FieldValues>({
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
            <Input
              {...field}
              {...props}
              type="number"
              onKeyDown={validateNumber}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
