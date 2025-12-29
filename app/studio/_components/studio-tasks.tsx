import { Icon } from "@/components/ui/icon";
import { TrainingCard } from "../_libs/mock-studio-data";
import { StudioSectionWrapper } from "./studio-section-wrapper";
import { StudioTaskCard } from "./studio-task-card";

interface StudioTasksProps {
  trainingCards: TrainingCard[];
}

export function StudioTasks({ trainingCards }: StudioTasksProps) {
  const displayCards = trainingCards.slice(0, 2);

  return (
    <StudioSectionWrapper className='w-full p-1.5 rounded-[24px]'>
      <div className='space-y-2 w-full'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2.5 p-2'>
            <div className='w-8 h-8 bg-[#FF8D28]/10 rounded-lg flex items-center justify-center'>
              <Icon name='ChecklistIcon' className='size-6 text-[#FF8D28]' />
            </div>
            <h2 className='text-lg font-medium'>Today&apos;s Tasks</h2>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          {displayCards.map((card, index) => (
            <StudioTaskCard key={index} card={card} />
          ))}
        </div>
      </div>
    </StudioSectionWrapper>
  );
}
