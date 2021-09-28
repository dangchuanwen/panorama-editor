import * as mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
declare enum ToolNames {
    Tip = "Tip",
    Link = "Link",
    Font = "Font"
}
declare type HotSpot = {
    pitch: number;
    yaw: number;
    text: string;
    fontContent: string;
    toolName: ToolNames;
};
declare type Scene = {
    hotSpots: HotSpot[];
    panorama: string;
    type: string;
};
export declare type PanoramaTourConfig = {
    default: {
        firstScene: string;
    };
    scenes: {
        [key: string]: Scene;
    };
};
export declare type WorkDocument = Work & mongoose.Document;
export declare enum WorkTheme {
    Food = "Food",
    Festival = "Festival"
}
export declare class Work {
    user: User;
    workName: string;
    panoramaTourConfig: PanoramaTourConfig | null;
    workTheme: WorkTheme;
    createdTime: Date;
}
export declare const WorksSchema: mongoose.Schema<mongoose.Document<Work, any, any>, mongoose.Model<mongoose.Document<Work, any, any>, any, any>, undefined, {}>;
export {};
