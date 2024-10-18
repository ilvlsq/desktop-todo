import {
  Injectable,
  Inject,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class UsersService {
  constructor(@Inject('PG_POOL') private pool: Pool) {}

  async createUser(username: string) {
    const query = 'INSERT INTO users (username) VALUES ($1) RETURNING *';
    const values = [username];

    try {
      const res = await this.pool.query(query, values);
      return res.rows[0];
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      }
      throw error;
    }
  }

  async findByUsername(username: string) {
    const query = 'SELECT * FROM users WHERE username = $1';
    const values = [username];
    const res = await this.pool.query(query, values);
    if (res.rows.length === 0) {
      throw new NotFoundException('User not found');
    }
    return res.rows[0];
  }
}
