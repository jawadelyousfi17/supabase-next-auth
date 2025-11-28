'use client';

import { usePathname } from 'next/navigation';

export function usePathSegments() {
  const pathname = usePathname(); // e.g. "/projects/project1"
  const segments = pathname.split('/').filter(Boolean); // Remove empty strings

  return segments; // ["projects", "project1"]
}
