import { MindIcon } from "@/delphi-ui/icons";
import React from "react";
import { MindWidgetBubble } from "./components/mind-widget-bubble";
import { MindWidgetLevel } from "./components/mind-widget-level";
import { MindWidgetScore } from "./components/mind-widget-score";
import { MindWidgetWrapper } from "./components/mind-widget-wrapper";
import "./styles/mind-widget.styles.css";

interface MindWidgetProps {
  score?: number;
  level?: string;
}

export function MindWidget({
  score = 20,
  level = "Skilled",
}: MindWidgetProps = {}) {
  return (
    <MindWidgetWrapper>
      <MindWidgetBubble className='min-w-[112px]' level={level}>
        <div className='relative z-10 flex flex-col h-full gap-1 justify-center items-center p-1.5'>
          <div className='flex items-center justify-center gap-0.5'>
            <MindWidgetScore score={score} fontSize='text-2xl' />
          </div>
          <MindWidgetLevel level={level} />
        </div>
      </MindWidgetBubble>
    </MindWidgetWrapper>
  );
}
