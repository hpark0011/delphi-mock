"use client";

interface VariantsGridProps {
  children: React.ReactNode;
}

export function VariantsGrid({ children }: VariantsGridProps) {
  return <div className='grid grid-cols-3 gap-2'>{children}</div>;
}
