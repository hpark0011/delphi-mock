import { type TrainingDocType } from "@/features/mind-dialog";
import { Icon } from "@/components/ui/icon";
import { getDocTypeIcon } from "@/utils/doc-type-helpers";

interface MindWidgetStatusNewItemProps {
  name: string;
  docType?: TrainingDocType;
}

export function MindWidgetStatusNewItem({
  name,
  docType,
}: MindWidgetStatusNewItemProps) {
  return (
    <div className='flex items-center gap-0.5'>
      <Icon
        name={docType ? getDocTypeIcon(docType) : "DocFillIcon"}
        className='size-5 text-sand-9'
      />
      <span className='text-sm text-sand-10 max-w-[160px] truncate'>{name}</span>
    </div>
  );
}
