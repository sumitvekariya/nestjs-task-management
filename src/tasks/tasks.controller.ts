import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidation } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './taskstatus.enum';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Get()
    getTasks(
        @Query(ValidationPipe) getTasksFilterDto: GetTasksFilterDto,
        @GetUser() user: User
    ): Promise<Task[]> {
        return this.taskService.getTasks(getTasksFilterDto, user);
    }

    @Get('/:id')
    getTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<Task> {
        return this.taskService.getTaskById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User
    ): Promise<Task> {
        return this.taskService.createTask(createTaskDto, user);
    }

    @Delete(':/id')
    deleteTask(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<void> {
        return this.taskService.deleteTask(id, user);
    }

    @Patch('/:id/status')
    updateTask(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidation) status: TaskStatus,
        @GetUser() user: User
    ): Promise<Task> {
        return this.taskService.updateTask(id, status, user);
    }
}
