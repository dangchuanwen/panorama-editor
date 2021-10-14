import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CultureThemeDocument = CultureTheme & Document;

@Schema()
export class CultureTheme {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  rules: string;

  @Prop({ type: Date, default: Date.now })
  createdTime: Date;
}

export const CultureThemeSchema = SchemaFactory.createForClass(CultureTheme);
