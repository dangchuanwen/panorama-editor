import { ToolNames } from 'interface';
import React from 'react';

type Pitch = number;
type Yaw = number;

export type ICreateTooltipArgs = {
  id: string;
  text: string;
  toolName: ToolNames;
};
export type IClickHandlerArgs = {
  id: string;
  text: string;
  toolName: ToolNames;
};
export type ICreateTooltipFunc = (hotSpotDiv: HTMLDivElement, createTooltipArgs: ICreateTooltipArgs) => void;
export type IClickHandlerFunc = (e: React.MouseEvent<HTMLDivElement>, clickHandlerArgs: IClickHandlerArgs) => void;

interface IDefaultConfig {
  firstScene: string;
  sceneFadeDuration: number;
}
export interface IHotSpot {
  id?: string;
  pitch: Pitch;
  yaw: Yaw;
  type?: 'scene' | 'info';
  sceneId?: string;
  text?: string;
  clickHandlerFunc?: IClickHandlerFunc;
  clickHandlerArgs?: IClickHandlerArgs;
  createTooltipFunc?: ICreateTooltipFunc;
  createTooltipArgs: ICreateTooltipArgs;
}
interface IScene {
  type: 'equirectangular' | 'cubemap' | 'multires';
  panorama: string;
  hotSpots?: IHotSpot[];
  autoLoad: boolean;
}
interface IConfig {
  default: IDefaultConfig;
  scenes: {
    [key: string]: IScene;
  };
}
export interface IPannellum {
  viewer: (name: string, config: IConfig) => IPannellum;
  mouseEventToCoords: (e: React.DragEvent) => [Pitch, Yaw];
  addHotSpot: (hotSpot: IHotSpot) => void;
  removeHotSpot: (hotSpotId: string, sceneId?: string) => void;
  on: (eventName: 'mouseup', listener: () => void) => void;
}
