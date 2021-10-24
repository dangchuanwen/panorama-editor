import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdminAuthGuard } from 'src/auth/guards/admin.guard';
import { CreateTaskProcessStepDto } from './dto/create-task-process.dto';
import { UpdateTaskProcessStepDto } from './dto/update-task-process-step.dto';
import { TasksProcessService } from './tasksProcess.service';

@Controller('tasks-process')
export class TasksProcessController {
  constructor(private tasksProcessService: TasksProcessService) {}

  @Get()
  async getTasksProcess() {
    return this.tasksProcessService.getTasksProcess();
  }

  @UseGuards(AdminAuthGuard)
  @Post()
  async createTaskProcessStep(@Body() body: CreateTaskProcessStepDto) {
    return this.tasksProcessService.createTaskProcessStep(
      body.name,
      body.description,
      body.order,
    );
  }

  @UseGuards(AdminAuthGuard)
  @Put('/:id')
  async updateTaskProcessStep(
    @Param('id') id: string,
    @Body() body: UpdateTaskProcessStepDto,
  ) {
    return this.tasksProcessService.updateTaskProcessStep(id, body);
  }

  @UseGuards(AdminAuthGuard)
  @Delete('/:id')
  async removeTaskProcessStep(@Param('id') id: string) {
    return this.tasksProcessService.removeTaskProcessStep(id);
  }
}
