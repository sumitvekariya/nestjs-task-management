import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidation } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Get()
    getTasks(
        @Query(ValidationPipe) getTasksFilterDto: GetTasksFilterDto
    ): Task[] {
        if (Object.keys(getTasksFilterDto).length) {
            return this.taskService.getTasksWithFilters(getTasksFilterDto);
        }
        return this.taskService.getAllTasks();
    }

    @Get()
    getAllTasks(): Task[] {
        return this.taskService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto: CreateTaskDto
    ): Task {
        return this.taskService.createTask(createTaskDto);
    }

    @Delete(':/id')
    deleteTask(@Param('id') id: string): void {
        return this.taskService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTask(
        @Param('id') id: string,
        @Body('status', TaskStatusValidation) status: TaskStatus
    ): Task {
        return this.taskService.updateTask(id, status);
    }
}
