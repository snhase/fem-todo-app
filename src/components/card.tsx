import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function Card({ children }: Props) {
  return (
    <section className="w-4/5 md:w-1/2 lg:w-[38%] mx-auto bg-white dark:bg-veryDarkDesaturatedBlue shadow-xl rounded-md border-slate-200 dark:border-0">
      {children}
    </section>
  );
}