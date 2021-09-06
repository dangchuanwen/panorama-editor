import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { PublishedWork } from 'src/publishedWorks/schemas/publishedWork.schema';
import { User } from 'src/users/schemas/user.schema';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop()
  content: string;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: PublishedWork.name })
  commentedPublishedWork: PublishedWork;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: User.name })
  publisher: User;

  @Prop({ default: Date.now })
  createdTime: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
