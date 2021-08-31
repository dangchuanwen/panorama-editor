import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';

export type UserDocument = User & Document;
export enum Gender {
  Male,
  Female,
}
export enum Country {
  China,
  Uzbekistan,
  Indonesia,
}

@Schema()
export class User {
  @Prop()
  userName: string;

  @Prop()
  password: string;

  @Prop({ type: mongooseSchema.Types.Number, enum: Gender })
  gender: Gender;

  @Prop({ type: mongooseSchema.Types.Number, enum: Country })
  country: Country;

  @Prop({ default: Date.now })
  createdTime: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
