import { useState } from "react";
import "../../styles/taskList.css";
import { TaskFormProps } from "../../types";

export default function TaskForm({ onCreate }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (title.trim() === "" || description.trim() === "") {
      console.error("Title and description are required");
      return;
    }

    onCreate(title, description, status);
    setTitle("");
    setDescription("");
    setStatus(false);
  }

  return (
    <form className="create-task-form" onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
          required
        />
      </div>
      <div className="status-field">
        <label>Status:</label>
        <input
          type="checkbox"
          checked={status}
          onChange={(e) => setStatus(e.target.checked)}
        />
        <span>{status ? "Completed" : "Incomplete"}</span>
      </div>
      <button type="submit" className="create-task-btn">
        Create New Task
      </button>
    </form>
  );
}
