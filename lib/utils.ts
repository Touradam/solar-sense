import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper to add base path for GitHub Pages deployment
export function withBasePath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/SEPT-LLC' : '';
  return `${basePath}${path}`;
}
