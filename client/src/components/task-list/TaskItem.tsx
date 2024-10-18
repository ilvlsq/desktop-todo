import { useState } from "react";
import { TaskItemProps } from "../../types";
import "../../styles/taskList.css";

export default function TaskItem({
  task,
  onDelete,
  onUpdate,
  onToggleStatus,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
  });

  function handleSave() {
    onUpdate(task.id, editedTask.title, editedTask.description, task.status);
    setIsEditing(false);
  }

  return (
    <li className="task-item">
      {isEditing ? (
        <>
          <div className="edit">
            <div className="edit-forms">
              <input
                type="text"
                value={editedTask.title}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, title: e.target.value })
                }
              />
              <textarea
                value={editedTask.description}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, description: e.target.value })
                }
              />
            </div>
            <button className="done-task-btn" onClick={handleSave}>
              Save
            </button>
            <button
              className="delete-task-btn"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="task-info">
            <span
              className={`task-title ${task.status ? "strikethrough" : ""}`}
            >
              {task.title}
            </span>
            <span>{task.description}</span>
          </div>
          <div className="task-buttons">
            <button
              className="done-task-btn"
              onClick={() => onToggleStatus(task.id)}
            >
              Done!
            </button>
            <button
              className="edit-task-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="delete-task-btn"
              onClick={() => onDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}
