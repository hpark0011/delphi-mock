import { CircleDashedIcon } from "lucide-react";
import { TrainingCard } from "../_lib/mock-studio-data";

interface StudioTaskCardProps {
  card: TrainingCard;
}

export function StudioTaskCard({ card }: StudioTaskCardProps) {
  return (
    <div className='group p-3 rounded-[20px] bg-card dark:bg-[#262626] hover:bg-[#EBEBE9] dark:hover:bg-[#2C2C2A] transition-colors cursor-pointer shadow-card-primary flex flex-col gap-3 w-full h-[144px]'>
      <CircleDashedIcon className='size-5 min-h-5 text-icon-light' />
      <div className='flex flex-col w-full h-full'>
        <h3 className='font-medium text-[#21201C] dark:text-[#EEEEEC]'>
          {card.title}
        </h3>
        <p className='text-sm leading-[1.4] text-[#8D8D86] dark:text-neutral-500'>
          {card.description}
        </p>
      </div>
    </div>
  );
}
