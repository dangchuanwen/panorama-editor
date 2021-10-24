import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskProcess, TaskProcessSchema } from './schemas/tasksProcess.schema';
import { TasksProcessController } from './tasksProcess.controller';
import { TasksProcessService } from './tasksProcess.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaskProcess.name, schema: TaskProcessSchema },
    ]),
  ],
  controllers: [TasksProcessController],
  providers: [TasksProcessService],
})
export class TasksProcessModule {}
