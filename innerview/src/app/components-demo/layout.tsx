import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Innerview - Demonstração de Componentes',
  description: 'Demonstração dos componentes de formulário da plataforma Innerview',
};

export default function ComponentsDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
    </div>
  );
} 