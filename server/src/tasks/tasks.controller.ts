import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('user/:userId')
  async findAll(@Param('userId') userId: string) {
    return this.tasksService.findAllByUser(userId);
  }

  @Post()
  async createTask(
    @Body()
    body: {
      userId: string;
      title: string;
      description: string;
      status: boolean;
    },
  ) {
    return this.tasksService.createTask(
      body.userId,
      body.title,
      body.description,
      body.status,
    );
  }

  @Put(':taskId')
  async updateTask(
    @Param('taskId') taskId: string,
    @Body()
    body: {
      userId: string;
      title: string;
      description: string;
      status: boolean;
    },
  ) {
    return this.tasksService.updateTask(
      body.userId,
      Number(taskId),
      body.title,
      body.description,
      body.status,
    );
  }

  @Delete(':taskId')
  async deleteTask(
    @Param('taskId') taskId: string,
    @Body() body: { userId: string },
  ) {
    return this.tasksService.deleteTask(body.userId, Number(taskId));
  }
}
