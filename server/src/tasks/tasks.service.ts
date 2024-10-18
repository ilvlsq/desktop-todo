import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class TasksService {
  constructor(@Inject('PG_POOL') private pool: Pool) {}

  async findAllByUser(userId: string) {
    const query =
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC';
    const values = [userId];
    const res = await this.pool.query(query, values);
    return res.rows;
  }

  async createTask(
    userId: string,
    title: string,
    description: string,
    status: boolean,
  ) {
    const query = `
      INSERT INTO tasks (user_id, title, description, status)
      VALUES ($1, $2, $3, $4) RETURNING *
    `;
    const values = [userId, title, description, status];
    const res = await this.pool.query(query, values);
    return res.rows[0];
  }

  async updateTask(
    userId: string,
    taskId: number,
    title: string,
    description: string,
    status: boolean,
  ) {
    const query = `
      UPDATE tasks SET title = $1, description = $2, status = $3, updated_at = NOW()
      WHERE id = $4 AND user_id = $5 RETURNING *
    `;
    const values = [title, description, status, taskId, userId];
    const res = await this.pool.query(query, values);
    return res.rows[0];
  }

  async deleteTask(userId: string, taskId: number) {
    const query = 'DELETE FROM tasks WHERE id = $1 AND user_id = $2';
    const values = [taskId, userId];
    await this.pool.query(query, values);
    return { message: 'Task deleted successfully' };
  }
}
