import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { updateWork, Work } from 'requests/requests';
import { IHotSpot } from 'types/pannellum/interface';
import { exportPanoramaTourConfig, generateUniqueId } from 'utils';
import { createTooltipInDev } from '../components/HotSpot';
import { AxiosPromise } from 'axios';
import { StudioPageParams } from 'routes/config';
export interface HotSpot extends IHotSpot {
  activated?: boolean;
}
export interface IPanoramaImage {
  url: string;
  id: string;
  hotSpots: HotSpot[];
  isEntry: boolean;
  activated: boolean;
}

interface IAddImage {
  (url: string): void;
}
interface IInitPanoramaImages {
  (panoramaImages: IPanoramaImage[]): void;
}
interface ISwitchImage {
  (imageID: string): void;
}
interface IRemoveImage {
  (imageID: string): void;
}
interface IAddHotSpot {
  (newHotSpot: HotSpot): void;
}
interface ISwitchHotSpot {
  (targetID: string): void;
}
interface IDeSelectAllHotSpots {
  (): void;
}
interface IUpdateActivatedHotSpot {
  (hotSpot: HotSpot): void;
}
interface IRemoveActivatedHotSpot {
  (hotSpotID: string): void;
}
interface IUpdatePanoramaTourConfig {
  (): AxiosPromise<Work>;
}

export interface IStudioState {
  panoramaImages: IPanoramaImage[];
  renderCanvasFlag: number;
  addImage: IAddImage;
  switchImage: ISwitchImage;
  removeImage: IRemoveImage;
  addHotSpot: IAddHotSpot;
  switchHotSpot: ISwitchHotSpot;
  deSelectAllHotSpots: IDeSelectAllHotSpots;
  updateActivatedHotSpot: IUpdateActivatedHotSpot;
  removeActivatedHotSpot: IRemoveActivatedHotSpot;
  initPanoramaImages: IInitPanoramaImages;
  uploadPanoramaTourConfig: IUpdatePanoramaTourConfig;
}

let images: IPanoramaImage[] = [];

export const useStudioState: () => IStudioState = () => {
  const [panoramaImages, setPanoramaImages] = useState<IPanoramaImage[]>([]);
  const [renderCanvasFlag, setRenderCanvasFlag] = useState<number>(0);
  const currentRoute = useRouteMatch<StudioPageParams>();
  const workID: string = currentRoute.params.workID;
  const uploadPanoramaTourConfig = async () => {
    return updateWork(workID, exportPanoramaTourConfig(images));
  };
  const startTimedUpload = () => {
    setTimeout(() => {
      uploadPanoramaTourConfig();
      startTimedUpload();
    }, Math.ceil(15 + Math.random() * 15) * 1000);
  };
  useEffect(() => {
    startTimedUpload();
  }, []);

  const initPanoramaImages: IInitPanoramaImages = (panoramaImages: IPanoramaImage[]) => {
    for (const image of panoramaImages) {
      for (const hotSpot of image.hotSpots) {
        hotSpot.clickHandlerFunc = (_e: React.MouseEvent<HTMLDivElement>, hotSpot: HotSpot) => {
          switchHotSpot(hotSpot.id);
        };
        hotSpot.clickHandlerArgs = hotSpot;
        hotSpot.createTooltipFunc = createTooltipInDev(hotSpot.toolName, hotSpot);
      }
    }
    images = panoramaImages;
    setPanoramaImages(images);
    console.log(images);
  };

  const addImage: IAddImage = (url: string) => {
    const newImages = [...images];
    const newImage: IPanoramaImage = {
      url,
      id: generateUniqueId(),
      hotSpots: [],
      isEntry: images.length === 0,
      activated: images.length === 0,
    };
    newImages.push(newImage);
    images = newImages;
    setPanoramaImages(images);
    if (images.length === 1) {
      setRenderCanvasFlag(renderCanvasFlag + 1);
    }
  };

  const switchImage: ISwitchImage = (imageID: string) => {
    const clickedImage: IPanoramaImage | undefined = images.find((item) => item.id === imageID);
    if (clickedImage && !clickedImage.activated) {
      const newImages = images.map((item) => {
        item.activated = item.id === imageID;
        return item;
      });
      setRenderCanvasFlag(renderCanvasFlag + 1);
      images = newImages;
      setPanoramaImages(images);
    }
  };

  const removeImage: IRemoveImage = (imageID: string) => {
    const newImages = images.filter((item) => item.id !== imageID);
    images = newImages;
    setRenderCanvasFlag(renderCanvasFlag + 1);
    setPanoramaImages(images);
  };

  const addHotSpot: IAddHotSpot = (newHotSpot: HotSpot) => {
    const newImages = [...images];
    const activatedImage: IPanoramaImage | undefined = newImages.find((item) => item.activated);
    if (activatedImage) {
      activatedImage.hotSpots = [...activatedImage.hotSpots, newHotSpot];
      images = newImages;
      setPanoramaImages(images);
      switchHotSpot(newHotSpot.id);
    }
  };

  const switchHotSpot: ISwitchHotSpot = (targetID: string) => {
    const newImages = [...images];
    const activatedImage: IPanoramaImage | undefined = newImages.find((item) => item.activated);
    if (activatedImage) {
      activatedImage.hotSpots.forEach((item) => (item.activated = item.id === targetID));
      images = newImages;
      setPanoramaImages(images);
    }
  };

  const deSelectAllHotSpots: IDeSelectAllHotSpots = () => {
    const newImages = [...images];
    const activatedImage: IPanoramaImage | undefined = newImages.find((item) => item.activated);
    if (activatedImage) {
      activatedImage.hotSpots.forEach((item) => (item.activated = false));
      images = newImages;
      setPanoramaImages(images);
    }
  };

  const updateActivatedHotSpot: IUpdateActivatedHotSpot = (hotSpot: HotSpot) => {
    const newImages = [...images];
    const activatedImage: IPanoramaImage | undefined = newImages.find((item) => item.activated);
    if (activatedImage) {
      activatedImage.hotSpots = activatedImage.hotSpots.map((item) => {
        return item.id === hotSpot.id ? hotSpot : item;
      });
      images = newImages;
      setPanoramaImages(images);
    }
  };

  const removeActivatedHotSpot: IRemoveActivatedHotSpot = (hotSpotID: string) => {
    const newImages = [...images];
    const activatedImage: IPanoramaImage | undefined = newImages.find((item) => item.activated);
    if (activatedImage) {
      activatedImage.hotSpots = activatedImage.hotSpots.filter((item) => {
        return item.id !== hotSpotID;
      });
      images = newImages;
      setPanoramaImages(images);
    }
  };

  return {
    panoramaImages,
    renderCanvasFlag,
    addImage,
    deSelectAllHotSpots,
    switchHotSpot,
    switchImage,
    removeImage,
    addHotSpot,
    updateActivatedHotSpot,
    removeActivatedHotSpot,
    initPanoramaImages,
    uploadPanoramaTourConfig,
  };
};
