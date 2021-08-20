import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  userName: string;

  @Prop()
  password: string;

  @Prop({ default: Date.now })
  createdTime: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
