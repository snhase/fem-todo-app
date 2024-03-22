import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function Card({ children }: Props) {
  return (
    <section className="w-1/2 mx-auto p-10 bg-white shadow-card min-h-[400px] rounded-2xl border border-solid border-slate-200">
      {children}
    </section>
  );
}