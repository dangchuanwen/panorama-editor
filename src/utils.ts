import { QiniuCompeleteRes, ToolNames } from 'interface';
import { HotSpot, IPanoramaImage } from 'pages/studio/state/state';
import { getQiniuToken, PanoramaTourConfig } from 'requests/requests';
import * as qiniu from 'qiniu-js';
interface AnyObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const generateUniqueId: () => string = () => {
  const uniqueID = String(Math.ceil(Date.now() * Math.random()));
  return uniqueID;
};

export const importPanoramaTourConfig: (panoramaTourConfig: PanoramaTourConfig | null) => IPanoramaImage[] = (
  panoramaTourConfig: PanoramaTourConfig | null,
) => {
  if (panoramaTourConfig === null) {
    return [];
  }
  const panoramaImages: IPanoramaImage[] = [];
  const scenes = panoramaTourConfig.scenes;
  const sceneIDs = Object.keys(scenes);
  for (const sceneID in scenes) {
    const scene = scenes[sceneID];
    const sceneHotSPots = scene.hotSpots;
    const hotSpotsDev: HotSpot[] = [];
    for (const hotSpotProd of sceneHotSPots) {
      const hotSpotDev: HotSpot = {
        id: generateUniqueId(),
        yaw: hotSpotProd.yaw,
        pitch: hotSpotProd.pitch,
        text: hotSpotProd.text,
        type: hotSpotProd.type,
        fontContent: hotSpotProd.fontContent,
        toolName: hotSpotProd.toolName,
        targetID: hotSpotProd.sceneId,
        activated: false,
      };
      hotSpotsDev.push(hotSpotDev);
    }

    panoramaImages.push({
      url: scene.panorama,
      id: sceneID,
      yaw: scene.yaw,
      pitch: scene.pitch,
      hfov: scene.hfov,
      hotSpots: hotSpotsDev,
      isEntry: sceneID === sceneIDs[0],
      activated: sceneID === sceneIDs[0],
    });
  }
  return panoramaImages;
};

export const exportPanoramaTourConfig = (panoramaImages: IPanoramaImage[]): PanoramaTourConfig | null => {
  if (panoramaImages.length === 0) return null;
  const scenes: AnyObject = {};
  for (const item of panoramaImages) {
    const hotSpotsOfItem = [];
    for (const hotSpot of item.hotSpots) {
      const newHotSpot: AnyObject = {};
      newHotSpot.yaw = hotSpot.yaw;
      newHotSpot.pitch = hotSpot.pitch;
      newHotSpot.toolName = hotSpot.toolName;
      newHotSpot.type = hotSpot.toolName === ToolNames.Link ? 'scene' : 'info';
      newHotSpot.text = hotSpot.text;
      newHotSpot.fontContent = hotSpot.fontContent || '';
      if (hotSpot.toolName === ToolNames.Link) {
        if (panoramaImages.findIndex((image) => image.id === hotSpot.targetID) !== -1) {
          newHotSpot.sceneId = hotSpot.targetID;
        }
      }
      hotSpotsOfItem.push(newHotSpot);
    }
    scenes[item.id] = {
      autoLoad: true,
      type: 'equirectangular',
      panorama: item.url,
      yaw: item.yaw || 0,
      pitch: item.pitch || 0,
      hfov: item.hfov || 100,
      hotSpots: hotSpotsOfItem,
    };
  }
  const config: AnyObject = {
    default: {
      firstScene: panoramaImages[0].id,
    },
    scenes: scenes,
  };
  return config as PanoramaTourConfig;
};

export const uploadFile: (file: File) => Promise<QiniuCompeleteRes> = async (file: File) => {
  return new Promise<QiniuCompeleteRes>(async (resolve, reject) => {
    const getTokenRes = await getQiniuToken();
    const observer = {
      error(err: unknown) {
        reject(err);
      },
      complete(res: QiniuCompeleteRes) {
        resolve(res);
      },
    };
    const observable = qiniu.upload(file, undefined, getTokenRes.data);
    observable.subscribe(observer);
  });
};
