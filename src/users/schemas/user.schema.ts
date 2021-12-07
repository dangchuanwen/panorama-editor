import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { CultureTheme } from 'src/cultureThemes/schemas/cultureTheme.schema';

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

  @Prop()
  group: string;

  @Prop()
  introductionVideoLink: string;

  @Prop()
  introductionTextLink: string;

  @Prop()
  avatarUrl: string;

  @Prop({ type: [mongooseSchema.Types.ObjectId], ref: CultureTheme.name })
  preferCultureThemes: CultureTheme[];

  @Prop({ default: Date.now })
  createdTime: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
