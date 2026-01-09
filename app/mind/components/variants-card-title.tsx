import React from "react";

function VariantsCardTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className='absolute top-3 left-4 text-sm font-medium text-sand-10 dark:text-sand-11 z-10'>
      {children}
    </div>
  );
}

export default VariantsCardTitle;
