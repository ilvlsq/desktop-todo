import "../../styles/taskList.css";
import { TaskFilterProps } from "../../types";

export default function TaskFilter({
  filter,
  statusFilter,
  setFilter,
  setStatusFilter,
}: TaskFilterProps) {
  return (
    <div className="task-filter">
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search tasks"
      />
      <label>Task filter:</label>
      <select
        value={statusFilter}
        onChange={(e) =>
          setStatusFilter(e.target.value as "all" | "incomplete" | "completed")
        }
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
    </div>
  );
}
