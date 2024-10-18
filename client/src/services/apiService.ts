import axios, { AxiosResponse } from "axios";
import { User, Task } from "../types";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

async function getRequest<T>(endpoint: string): Promise<T> {
  const response: AxiosResponse<T> = await api.get(endpoint);
  return response.data;
}

async function postRequest<T>(endpoint: string, data: unknown): Promise<T> {
  const response: AxiosResponse<T> = await api.post(endpoint, data);
  return response.data;
}

async function putRequest<T>(endpoint: string, data: unknown): Promise<T> {
  const response: AxiosResponse<T> = await api.put(endpoint, data);
  return response.data;
}

async function deleteRequest<T>(endpoint: string, data: unknown): Promise<T> {
  const response: AxiosResponse<T> = await api.delete(endpoint, { data });
  return response.data;
}

export function createUser(username: string): Promise<User> {
  return postRequest<User>("/users", { username });
}

export function getUser(username: string): Promise<User> {
  return getRequest<User>(`/users/${username}`);
}

export function getUserTasks(userId: string): Promise<Task[]> {
  return getRequest<Task[]>(`/tasks/user/${userId}`);
}

export function createTask(
  userId: string,
  title: string,
  description: string,
  status: boolean
): Promise<Task> {
  return postRequest<Task>("/tasks", { userId, title, description, status });
}

export function updateTask(
  taskId: number,
  userId: string,
  title: string,
  description: string,
  status: boolean
): Promise<Task> {
  return putRequest<Task>(`/tasks/${taskId}`, {
    userId,
    title,
    description,
    status,
  });
}

export function deleteTask(
  taskId: number,
  userId: string
): Promise<{ message: string }> {
  return deleteRequest<{ message: string }>(`/tasks/${taskId}`, { userId });
}
