import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Work } from 'src/works/schemas/work.schema';

export type PublishedWorkDocument = PublishedWork & mongoose.Document;

@Schema()
export class PublishedWork {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Work' })
  work: Work;

  @Prop()
  introduction: string;

  @Prop({ default: Date.now })
  createdTime: Date;
}

export const PublishedWorkSchema = SchemaFactory.createForClass(PublishedWork);
