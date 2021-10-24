import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TaskProcess,
  TaskProcessDocument,
} from './schemas/tasksProcess.schema';

@Injectable()
export class TasksProcessService {
  constructor(
    @InjectModel(TaskProcess.name)
    private readonly taskProcessModel: Model<TaskProcessDocument>,
  ) {}

  async findTaskProcessStepByOrder(order: number) {
    return this.taskProcessModel.findOne({ order });
  }

  async createTaskProcessStep(
    name: string,
    description: string,
    order: number,
  ) {
    const oldStep: TaskProcess = await this.findTaskProcessStepByOrder(order);
    if (oldStep) {
      throw new HttpException('Order exist!', HttpStatus.CONFLICT);
    }
    return this.taskProcessModel.create({ name, description, order });
  }

  async updateTaskProcessStep(id: string, newVal: TaskProcess) {
    return this.taskProcessModel.findByIdAndUpdate(id, newVal);
  }

  async getTasksProcess() {
    return this.taskProcessModel.find().sort({ order: 1 }).lean();
  }

  async removeTaskProcessStep(id: string) {
    return this.taskProcessModel.findByIdAndDelete(id);
  }
}
