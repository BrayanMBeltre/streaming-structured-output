import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type EnumType = { [key: string]: string | number };
type EnumAsArrayType = {
  key: string;
  value: string | number;
}[];
export const enumToArray = (data: EnumType): EnumAsArrayType =>
  Object.keys(data)
    .filter((key) => Number.isNaN(+key))
    .map((key: string) => ({
      key,
      value: data[key],
    }));
