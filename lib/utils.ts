import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper for asset paths (no base path needed for Hostinger)
export function withBasePath(path: string): string {
  return path;
}
