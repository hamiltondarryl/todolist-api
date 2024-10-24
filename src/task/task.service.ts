import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskDto } from './dto/task_dto';

@Injectable()
export class TaskService {
    constructor(private prismaService: PrismaService) { }

    // Method to create a new task
    async createTask(taskDto: TaskDto, userId: string) {

        const { contenu } = taskDto;

        // Utilisateur inexistant
        const existingUser = await this.prismaService.user.findUnique({
            where: { id: userId },
        });

        if (!existingUser) {
            throw new HttpException('Action interdite', HttpStatus.CONFLICT);
        }

        const task = await this.prismaService.task.create({
            data: {
                contenu,
                user: {
                    connect: { id: userId },
                },
            },
        });
        return { message: 'Task created successfully' };
    }

    // Method to update a task
    async updateTask(taskDto: TaskDto, taskId: string) {
        const { contenu } = taskDto;

        const team = await this.prismaService.task.findUnique({
            where: { id: taskId },
        });

        if (!team) {
            throw new NotFoundException(`Team with not found.`);
        }

        await this.prismaService.task.update({
            where: { id: taskId },
            data: { contenu },
        });

        return { message: 'Task updated successfully' };
    }

    // Method to get all tasks
    async getTasks(userId: string) {
        const tasks = await this.prismaService.task.findMany({
            where: { userId },
        });

        return tasks;
    }

    // Method to delete a task
    async deleteTask(taskId: string) {
        const task = await this.prismaService.task.findUnique({
            where: { id: taskId },
        });

        if (!task) {
            throw new NotFoundException(`Task with id ${taskId} not found.`);
        }

        await this.prismaService.task.delete({
            where: { id: taskId },
        });

        return { message: 'Task deleted successfully' };
    }
}
