"use client";

import React from 'react';
import './globals.css';
import { initializeMocks } from '../mocks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Inicializar mocks apenas em ambiente de desenvolvimento
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  initializeMocks();
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
} 