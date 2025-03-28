"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/slices/authSlice';

export function useAuth({ requireAuth = false, redirectTo = '/login' } = {}) {
  const { user, isAuthenticated, token, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      router.push(`${redirectTo}?redirectTo=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, requireAuth, redirectTo, router, pathname]);

  return { user, isAuthenticated, token, logout };
} 