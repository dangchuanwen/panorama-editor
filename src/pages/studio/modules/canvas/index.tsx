import React from 'react';
import { Box } from '@material-ui/core';
import { IClickHandlerFunc, IPannellum } from 'types/pannellum/interface';
import { ToolNames } from 'interface';
import { createTooltipInDev } from 'pages/studio/components/HotSpot';

import { generateUniqueId } from 'utils';
import { StudioContext } from 'pages/studio/state/context';
import { HotSpot, IPanoramaImage, IStudioState } from 'pages/studio/state/state';
let oldHotSpots: HotSpot[] = [];
const Canvas: React.FC = () => {
  const { panoramaImages, switchHotSpot, addHotSpot, deSelectAllHotSpots } =
    React.useContext<IStudioState>(StudioContext);
  const [pannellumInstance, setPannellumInstance] = React.useState<IPannellum | null>(null);
  const activatedImage: IPanoramaImage | undefined = panoramaImages.find((item) => item.activated);
  const activatedImageID = activatedImage?.id;
  const reRenderImageHotSpotsOnCanvas = () => {
    if (pannellumInstance && activatedImage) {
      const hotSpotsOfActivatedImage = activatedImage.hotSpots;
      // clear old hotSpots
      for (const hotSpot of oldHotSpots) {
        pannellumInstance.removeHotSpot(hotSpot.id);
      }
      // add new hotSpots
      for (const hotSpot of hotSpotsOfActivatedImage) {
        pannellumInstance.addHotSpot(hotSpot);
      }
      // update old hotSpots
      oldHotSpots = hotSpotsOfActivatedImage;
    }
  };
  reRenderImageHotSpotsOnCanvas();

  const handleClickHotSpot: IClickHandlerFunc = (_e: React.MouseEvent<HTMLDivElement>, hotSpot: HotSpot) => {
    switchHotSpot(hotSpot.id);
  };

  const handleMouseDrop = (p: IPannellum | null, e: React.DragEvent, toolName: ToolNames) => {
    if (!p) return;
    if (!toolName) return;
    const [pitch, yaw] = p.mouseEventToCoords(e);
    const hotSpotID = generateUniqueId();
    const newHotSpot: HotSpot = {
      id: hotSpotID,
      pitch,
      yaw,
      toolName,
      type: 'info',
      clickHandlerFunc: handleClickHotSpot,
      text: '',
    };
    newHotSpot.clickHandlerArgs = newHotSpot;
    newHotSpot.createTooltipFunc = createTooltipInDev(toolName, newHotSpot);
    addHotSpot(newHotSpot);
  };

  React.useEffect(() => {
    if (!activatedImage) return;
    if (pannellumInstance) {
      pannellumInstance.destroy();
    }

    const p = window.pannellum.viewer('panorama', {
      default: {
        firstScene: 'scene0',
        sceneFadeDuration: 1000,
      },
      scenes: {
        scene0: {
          panorama: activatedImage.url,
          autoLoad: true,
          type: 'equirectangular',
          hotSpots: [],
        },
      },
    }) as IPannellum;
    p.on('mouseup', () => {
      deSelectAllHotSpots();
    });
    setPannellumInstance(p);
  }, [activatedImageID]);

  return (
    <>
      {activatedImage ? (
        <Box
          height="100%"
          onContextMenuCapture={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onDrop={(e) => handleMouseDrop(pannellumInstance, e, e.dataTransfer.getData('toolName') as ToolNames)}
          onDragOver={(e) => e.preventDefault()}
          width="100%"
          id="panorama"
        ></Box>
      ) : (
        '请选择一张全景图片'
      )}
    </>
  );
};

export default Canvas;
