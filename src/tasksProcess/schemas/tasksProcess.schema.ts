import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskProcessDocument = TaskProcess & Document;

@Schema()
export class TaskProcess {
  @Prop()
  name: string;

  @Prop()
  order: number;

  @Prop({ default: false })
  done: boolean;

  @Prop()
  description: string;

  @Prop({ default: Date.now })
  createdTime: Date;
}

export const TaskProcessSchema = SchemaFactory.createForClass(TaskProcess);
