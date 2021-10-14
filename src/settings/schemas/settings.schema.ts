import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingDocument = Setting & Document;

@Schema()
export class Setting {
  @Prop({ default: false })
  grouped: boolean;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
