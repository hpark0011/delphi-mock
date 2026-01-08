"use client";

import { useState, useEffect, useRef } from "react";
import { useContainerScrollDirection } from "@/hooks/use-container-scroll-direction";
import {
  TopicSidebar,
  ConversationDisplay,
  InterviewInput,
} from "../_components";
import { useInterviewAI } from "../_hooks/use-interview-ai";
import { useInterviewContext } from "../_context/interview-context";

interface InterviewViewProps {
  userName?: string;
}

export function InterviewView({ userName = "Hyunsol" }: InterviewViewProps) {
  const [recording, setRecording] = useState(false);
  const { setHasResponses, setIsScrollingDown } = useInterviewContext();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingDown = useContainerScrollDirection(scrollContainerRef);

  const {
    topics,
    currentTopic,
    messages,
    isLoading,
    submitAnswer,
    skipQuestion,
    switchTopic,
    startNewTopic,
  } = useInterviewAI({ userName });

  const handleVoiceRecord = () => {
    setRecording(!recording);
    console.log("Voice recording:", !recording);
  };

  // Update hasResponses when user submits at least one answer
  useEffect(() => {
    const hasAnswers = topics.some((t) =>
      t.messages.some((m) => m.type === "answer")
    );
    setHasResponses(hasAnswers);
  }, [topics, setHasResponses]);

  // Sync scroll direction to context for header
  useEffect(() => {
    setIsScrollingDown(isScrollingDown);
  }, [isScrollingDown, setIsScrollingDown]);

  const sidebarTopics = topics.map((t) => ({
    id: t.id,
    title: t.title,
    isActive: t.id === currentTopic?.id,
    completionPercentage: t.completionPercentage,
    status: t.status,
  }));

  return (
    <>
      <TopicSidebar
        topics={sidebarTopics}
        onStartNewTopic={startNewTopic}
        onTopicSelect={switchTopic}
      />

      <div className="flex-1 flex flex-col relative">
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
          <ConversationDisplay
            title={currentTopic?.title ?? "Interview"}
            messages={messages}
            onSkip={skipQuestion}
            isLoading={isLoading}
          />
        </div>

        <InterviewInput
          onSubmit={submitAnswer}
          onVoiceRecord={handleVoiceRecord}
          isLoading={isLoading}
          recording={recording}
          disabled={isLoading}
        />
      </div>
    </>
  );
}
