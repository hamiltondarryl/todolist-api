import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards /jwt.guard';
import { TaskDto } from './dto/task_dto';

@ApiTags("Gestion des taches de l'utilisateur")
@Controller('task')
export class TaskController {
    constructor(private readonly taskService : TaskService) {}

    // Method to create a new task 
    @UseGuards(JwtAuthGuard)
    @HttpCode(201)
    @ApiOperation({ summary: "Création d'une tache " })
    @Post()
    async createTask(@Body() taskDto: TaskDto, @Req() req) {
        const userId = req.user.id;
        return await this.taskService.createTask(taskDto, userId);
    }

    // Method to update a task
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: "Mise à jour d'une tache " })
    @Put(':id')
    async updateTask(@Param('id') id: string, @Body() taskDto: TaskDto, @Req() req) {
        const userId = req.user.id;
        return await this.taskService.updateTask(taskDto, userId); 
    }     

    // Method to get all tasks
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: "Recuperation des taches " })
    @Get()
    async getTasks(@Req() req) {
        const userId = req.user.id;
        return await this.taskService.getTasks(userId);
    }

    // Method to delete a task
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @ApiOperation({ summary: "Suppression d'une tache " })
    @Delete(':id')
    async deleteTask(@Param('id') id: string, @Req() req) {
        return await this.taskService.deleteTask(id);
    }   

}
