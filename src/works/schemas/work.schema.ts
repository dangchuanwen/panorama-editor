import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schema';

enum ToolNames {
  Tip = 'Tip',
  Link = 'Link',
}

type HotSpot = {
  pitch: number;
  yaw: number;
  text: string;
  toolName: ToolNames;
};

type Scene = {
  hotSpots: HotSpot[];
  panorama: string;
  type: string;
};

type PanoramaTourConfig = {
  default: {
    firstScene: string;
  };
  scenes: {
    [key: string]: Scene;
  };
};

@Schema()
export class Work {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;

  @Prop()
  workName: string;

  @Prop()
  panoramaTourConfig: PanoramaTourConfig;

  @Prop()
  createdTime: Date;
}
