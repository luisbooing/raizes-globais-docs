import { ReactNode } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guia de Viagem - Raízes Globais Docs',
  description: 'Guia de Viagem versão para impressão.',
};

export default function GuideLayout({ children }: { children: ReactNode }) {
  // O layout aqui é limpo: sem Navbar e sem Footer.
  // Será usado especificamente para a versão "Impressão/PDF".
  return (
    <div className="bg-white min-h-screen text-black antialiased font-sans">
      {children}
    </div>
  );
}
