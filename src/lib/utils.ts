import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const COUNTRY_NOT_REACH = 'No country found';
export const API_NOT_REACH = 'Failed to fetch';

