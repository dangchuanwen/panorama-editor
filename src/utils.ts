import { ToolNames } from 'interface';
import { HotSpot, IPanoramaImage } from 'pages/studio/state/state';
import { PanoramaTourConfig } from 'requests/requests';

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
  console.log(panoramaTourConfig);
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
        toolName: hotSpotProd.toolName,
        targetID: hotSpotProd.sceneId,
        activated: false,
      };
      hotSpotsDev.push(hotSpotDev);
    }

    panoramaImages.push({
      url: scene.panorama,
      id: sceneID,
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
      if (hotSpot.toolName === ToolNames.Link) {
        newHotSpot.sceneId = hotSpot.targetID;
      }
      hotSpotsOfItem.push(newHotSpot);
    }

    scenes[item.id] = {
      type: 'equirectangular',
      panorama: item.url,
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
