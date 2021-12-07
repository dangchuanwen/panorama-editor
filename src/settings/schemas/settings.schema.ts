import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingDocument = Setting & Document;

@Schema()
export class Setting {
  @Prop({ default: false })
  grouped: boolean;

  @Prop({ default: true })
  showStudio: boolean;

  @Prop({ default: true })
  showPlayground: boolean;

  @Prop({ default: true })
  showFriends: boolean;

  @Prop({ default: true })
  showSettings: boolean;

  @Prop()
  qiniuFilePrefix: string;

  @Prop({ default: '' })
  clientHost: string;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
