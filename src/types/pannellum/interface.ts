import { ToolNames } from 'interface';
import { HotSpot } from 'pages/studio/state/state';
import React from 'react';

type Pitch = number;
type Yaw = number;

export type ICreateTooltipArgs = {
  id: string;
};
export type IClickHandlerArgs = {
  id: string;
};
export type ICreateTooltipFunc = (hotSpotDiv: HTMLDivElement, createTooltipArgs: ICreateTooltipArgs) => void;
export type IClickHandlerFunc = (e: React.MouseEvent<HTMLDivElement>, clickHandlerArgs: HotSpot) => void;

interface IDefaultConfig {
  firstScene: string;
  sceneFadeDuration: number;
}
export interface IHotSpot {
  id: string;
  pitch: Pitch;
  yaw: Yaw;
  type: 'scene' | 'info';
  toolName: ToolNames;
  targetID?: string;
  text?: string;
  fontContent?: string;
  clickHandlerFunc?: IClickHandlerFunc;
  clickHandlerArgs?: HotSpot;
  createTooltipFunc?: ICreateTooltipFunc;
  createTooltipArgs?: ICreateTooltipArgs;
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
  on: (eventName: 'mouseup' | 'zoomchange', listener: () => void) => void;
  getYaw: () => number;
  getPitch: () => number;
  destroy: () => void;
  getHfov: () => number;
}
