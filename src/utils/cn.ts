import { ClassValue, clsx } from 'clsx';

/**
 * Utility function to merge CSS classes
 * Combines clsx for conditional classes with Tailwind class merging
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
