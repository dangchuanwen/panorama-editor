type Pitch = number;
type Yaw = number;
interface IDefaultConfig {
  firstScene: string;
  sceneFadeDuration: number;
}
interface IHotSpot {
  pitch: Pitch;
  yaw: Yaw;
  type: 'scene' | 'info';
  sceneId?: string;
  text: string;
}
interface IScene {
  type: 'equirectangular' | 'cubemap' | 'multires';
  panorama: string;
  hotSpots?: IHotSpot[];
}
interface IConfig {
  default: IDefaultConfig;
  scenes: {
    [key: string]: IScene;
  };
}
interface IPannellum {
  viewer: (name: string, config: IConfig) => IPannellum;
  mouseEventToCoords: (e: Event) => [Pitch, Yaw];
  addHotSpot: (hotSpot: IHotSpot) => void;
}
export default IPannellum;
