import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schema';
import { CultureTheme } from 'src/cultureThemes/schemas/cultureTheme.schema';

enum ToolNames {
  Tip = 'Tip',
  Link = 'Link',
  Font = 'Font',
}

type HotSpot = {
  pitch: number;
  yaw: number;
  text: string;
  fontContent: string;
  toolName: ToolNames;
};

type Scene = {
  hotSpots: HotSpot[];
  panorama: string;
  type: string;
};

export type PanoramaTourConfig = {
  default: {
    firstScene: string;
  };
  scenes: {
    [key: string]: Scene;
  };
};

export type WorkDocument = Work & mongoose.Document;

@Schema()
export class Work {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  workName: string;

  @Prop({ type: mongoose.Schema.Types.Mixed, default: null })
  panoramaTourConfig: PanoramaTourConfig | null;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: CultureTheme.name })
  workTheme: CultureTheme;

  @Prop({ default: Date.now })
  createdTime: Date;
}

export const WorksSchema = SchemaFactory.createForClass(Work);
