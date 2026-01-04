// Components
export {
  MindDialogProvider,
  MindDialogHeader,
  useMindDialog,
} from "./components/mind-dialog";
export { LevelUpDialog } from "./components/level-up-dialog";
export { AddKnowledgeTab } from "./components/add-knowledge-tab";
export { KnowledgeTab } from "./components/knowledge-tab";
export { showTrainingQueueToast } from "./components/training-queue-toast";
export { TrainingStatusTab } from "./components/training-status/training-status-tab";
export { ActiveTrainingQueue } from "./components/training-status/active-training-queue";
export { TrainingSummary } from "./components/training-status/training-summary";
export { TrainingHistory } from "./components/training-status/training-history";

// Context
export {
  TrainingQueueProvider,
  useTrainingQueue,
} from "./context/training-queue-context";

// Hooks
export { useRecentlyAddedItem } from "./hooks/use-recently-added-item";
export { useTrainingProcessor } from "./hooks/use-training-processor";

// Types
export type { MindDialogTabId, OpenDialogOptions } from "./components/mind-dialog";
export type {
  TrainingDocType,
  QueueItem,
} from "./context/training-queue-context";
export type { RecentlyAddedItem } from "./hooks/use-recently-added-item";
export type { ProcessorCallbacks } from "./hooks/use-training-processor";
export type { TrainingItem } from "./components/training-status/training-history";

// Config/Utils
export {
  MIND_DIALOG_TABS,
  DEFAULT_MIND_DIALOG_TAB,
  getMindDialogTabConfig,
  getMindDialogWidthClass,
} from "./utils/mind-dialog-config";
