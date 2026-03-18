'use client';

import { Printer } from "lucide-react";

export default function PrintPDFButton() {
  return (
    <button 
      onClick={() => window.print()}
      className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-md"
    >
      <Printer size={20} />
      Baixar Guia PDF
    </button>
  );
}
