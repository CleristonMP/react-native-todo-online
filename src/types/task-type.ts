export type TaskType = {
  id: number;
  estimateAt: Date;
  doneAt: Date | null;
  desc: string;
};
