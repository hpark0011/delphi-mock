interface StudioGreetingProps {
  greeting?: string;
}

export function StudioGreeting({
  greeting = "Good Afternoon, Han!",
}: StudioGreetingProps) {
  return (
    <div className='px-4 mb-8'>
      <h1 className='text-[24px] leading-[1.2] font-medium text-[#21201C] dark:text-[#EEEEEC] text-center'>
        {greeting}
      </h1>
    </div>
  );
}
