"use client";

import React from 'react';
import { ThemeProvider } from "@/lib/context/ThemeContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/api/client";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
} 