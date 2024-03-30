import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function Card({ children }: Props) {
  return (
    <section className="w-4/5 md:w-1/2 lg:w-1/3 mx-auto bg-white shadow-card rounded-md border border-solid border-slate-200">
      {children}
    </section>
  );
}