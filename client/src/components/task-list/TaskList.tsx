import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import {
  getUserTasks,
  deleteTask,
  createTask,
  updateTask,
} from "../../services/apiService";
import { Task } from "../../types";
import { useNavigate } from "react-router";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import TaskFilter from "./TaskFilter";
import "../../styles/taskList.css";

export default function TaskList() {
  const { user, logout } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "completed" | "incomplete"
  >("all");

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchTasks = async () => {
      try {
        const tasks = await getUserTasks(user.id);
        setTasks(tasks);
      } catch (error) {
        console.error("Error with tasks:", error);
      }
    };

    fetchTasks();
  }, [user, navigate]);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  async function handleCreateTask(
    title: string,
    description: string,
    status: boolean
  ) {
    try {
      await createTask(user!.id, title, description, status);
      const newTasks = await getUserTasks(user!.id);
      setTasks(newTasks);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  }

  async function handleDeleteTask(taskId: number) {
    try {
      await deleteTask(taskId, user!.id);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  async function handleUpdateTask(
    taskId: number,
    title: string,
    description: string,
    status: boolean
  ) {
    try {
      await updateTask(taskId, user!.id, title, description, status);
      const updatedTasks = await getUserTasks(user!.id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  async function handleToggleTaskStatus(taskId: number) {
    try {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id === taskId) {
            const updatedTask = { ...task, status: !task.status };
            updateTask(
              taskId,
              user!.id,
              task.title,
              task.description,
              updatedTask.status
            );
            return updatedTask;
          }
          return task;
        })
      );
    } catch (error) {
      console.error("Error toggling task status:", error);
    }
  }

  const filteredTasks = tasks.filter((task) => {
    if (statusFilter === "completed" && !task.status) return false;
    if (statusFilter === "incomplete" && task.status) return false;
    if (
      filter &&
      !task.title.toLowerCase().includes(filter.toLowerCase()) &&
      !task.description.toLowerCase().includes(filter.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="tasklist-container">
      <button onClick={handleLogout} className="delete-task-btn">
        Logout
      </button>
      <h2>Your next tasks</h2>
      <TaskForm onCreate={handleCreateTask} />
      {tasks.length > 0 && (
        <TaskFilter
          filter={filter}
          statusFilter={statusFilter}
          setFilter={setFilter}
          setStatusFilter={setStatusFilter}
        />
      )}
      <ul className="task-list">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
            onToggleStatus={handleToggleTaskStatus}
          />
        ))}
      </ul>
    </div>
  );
}
