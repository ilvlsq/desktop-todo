export type User = {
  id: string;
  username: string;
};

export type Task = {
  id: number;
  user_id: string;
  title: string;
  description: string;
  status: boolean;
  created_at: string;
  updated_at: string;
};

export type TaskItemProps = {
  task: Task;
  onDelete: (taskId: number) => void;
  onUpdate: (
    taskId: number,
    title: string,
    description: string,
    status: boolean
  ) => void;
  onToggleStatus: (taskId: number) => void;
};

export type TaskFormProps = {
  onCreate: (title: string, description: string, status: boolean) => void;
};

export type TaskFilterProps = {
  filter: string;
  statusFilter: "all" | "completed" | "incomplete";
  setFilter: (filter: string) => void;
  setStatusFilter: (status: "all" | "completed" | "incomplete") => void;
};
