import React from 'react';
import { Box } from '@material-ui/core';
import { IClickHandlerArgs, IClickHandlerFunc, IPannellum } from 'types/pannellum/interface';
import { ToolNames } from 'interface';
import { createTooltip } from 'pages/studio/components/HotSpot';
import { IPubSubEvents, Publish, PubSubEvents, Subscribe } from 'pages/studio/pub-sub';
import {
  addHotSpot,
  removeHotSpot,
  renderHotSpotToCanvas,
  outStandClickedHotSpot,
  updateHotSpotText,
  getHotSpotById,
  unOutStandAllHotSpots,
} from 'pages/studio/state/hotSpots';
import { generateUniqueId } from 'utils';

const Canvas: React.FC = () => {
  const [panoramaCanvas, setPanoramaCanvas] = React.useState<IPannellum | null>(null);

  const handleClickHotSpot: IClickHandlerFunc = (
    _e: React.MouseEvent<HTMLDivElement>,
    hotSpotInfo: IClickHandlerArgs,
  ) => {
    const clickedHotSpot = getHotSpotById(hotSpotInfo.id);
    const oldText = (clickedHotSpot && clickedHotSpot.text) || '';
    hotSpotInfo.text = oldText;
    /* publish 'ClickHotSpot' event, subscriber in property-bar module*/
    Publish<IPubSubEvents['ClickHotSpot']>(PubSubEvents.ClickHotSpot, hotSpotInfo);
    // outstand clicked hotspot
    outStandClickedHotSpot(hotSpotInfo.id);
  };

  const handleMouseDrop = (p: IPannellum | null, e: React.DragEvent, toolName: ToolNames) => {
    if (p) {
      if (!toolName) return;
      const [pitch, yaw] = p.mouseEventToCoords(e);
      const hotSpotID = generateUniqueId();
      const hotSpotInfo: IClickHandlerArgs = {
        id: hotSpotID,
        text: '',
        toolName,
      };
      // render hot spot in canvas
      renderHotSpotToCanvas(panoramaCanvas, {
        id: hotSpotID,
        pitch,
        yaw,
        createTooltipFunc: createTooltip(toolName, (hotSpotDiv: HTMLDivElement) => {
          // store new hot spot
          addHotSpot({ div: hotSpotDiv, id: hotSpotInfo.id, text: '' });
          /* publish 'ClickHotSpot' event, subscriber in property-bar module*/
          Publish<IPubSubEvents['ClickHotSpot']>(PubSubEvents.ClickHotSpot, hotSpotInfo);
          // outstand clicked hotspot
          outStandClickedHotSpot(hotSpotInfo.id);
        }),
        createTooltipArgs: hotSpotInfo,
        clickHandlerArgs: hotSpotInfo,
        clickHandlerFunc: handleClickHotSpot,
      });
    }
  };
  React.useEffect(() => {
    /** subscribe 'InputTipText' event, publisher in property-bar module */
    Subscribe<IPubSubEvents['InputTipText']>(PubSubEvents.InputTipText, (tipText: string, hotSpotID: string) => {
      updateHotSpotText(tipText, hotSpotID);
    });
    /** subscribe 'RemoveHotSpot' event, publisher in property-bar module */
    Subscribe<IPubSubEvents['RemoveHotSpot']>(PubSubEvents.RemouveHotSpot, (hotSpotID: string) => {
      removeHotSpot(hotSpotID);
    });
    const p = window.pannellum.viewer('panorama', {
      default: {
        firstScene: 'passage',
        sceneFadeDuration: 1000,
      },
      scenes: {
        passage: {
          autoLoad: true,
          type: 'equirectangular',
          panorama: 'http://icetnnu.ltd/1.jpg',
        },
      },
    }) as IPannellum;
    p.on('mouseup', () => {
      /* publish 'ClickHotSpot' event, subscriber in property-bar module*/
      Publish<IPubSubEvents['ClickHotSpot']>(PubSubEvents.ClickHotSpot, { id: '', text: '', toolName: ToolNames.Tip });
      unOutStandAllHotSpots();
    });
    setPanoramaCanvas(p);
  }, []);

  return (
    <Box
      height="100%"
      onContextMenuCapture={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onDrop={(e) => handleMouseDrop(panoramaCanvas, e, e.dataTransfer.getData('toolName') as ToolNames)}
      onDragOver={(e) => e.preventDefault()}
      width="100%"
      id="panorama"
    ></Box>
  );
};

export default Canvas;
