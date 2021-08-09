import React from 'react';
import { Box } from '@material-ui/core';
import { IClickHandlerArgs, IClickHandlerFunc, IPannellum } from 'types/pannellum/interface';
import { ToolNames } from 'interface';
import { createTooltip } from 'pages/studio/components/HotSpot';
import { IPubSubEvents, Publish, PubSubEvents, Subscribe } from 'pages/studio/pub-sub';
import { renderHotSpotToCanvas, outStandClickedHotSpot, updateHotSpotText } from 'pages/studio/state/hotSpots';

const generateUniqueId: () => string = () => String(Math.ceil(Date.now() * Math.random()));

const Canvas: React.FC = () => {
  const handleClickHotSpot: IClickHandlerFunc = (e: React.MouseEvent<HTMLDivElement>, args: IClickHandlerArgs) => {
    /* publish 'ClickHotSpot' event, subscriber in property-bar module*/
    Publish<IPubSubEvents['ClickHotSpot']>(PubSubEvents.ClickHotSpot, e, args);
    // outstand clicked hotspot
    outStandClickedHotSpot(args.id);
  };
  const [panoramaCanvas, setPanoramaCanvas] = React.useState<IPannellum | null>(null);
  const handleMouseDrop = (p: IPannellum | null, e: React.DragEvent, toolName: ToolNames) => {
    if (p) {
      const [pitch, yaw] = p.mouseEventToCoords(e);
      const hotSpotID = generateUniqueId();
      // render hot spot in canvas
      renderHotSpotToCanvas(panoramaCanvas, {
        id: hotSpotID,
        pitch,
        yaw,
        createTooltipFunc: createTooltip(toolName, hotSpotID),
        createTooltipArgs: {
          id: hotSpotID,
          text: '',
          toolName,
        },
        clickHandlerArgs: {
          id: hotSpotID,
          toolName,
          text: '',
        },
        clickHandlerFunc: handleClickHotSpot,
      });
    }
  };
  React.useEffect(() => {
    /** subscribe 'InputTipText' event, publisher in property-bar module */
    Subscribe<IPubSubEvents['InputTipText']>(PubSubEvents.InputTipText, (tipText: string, hotSpotID: string) => {
      updateHotSpotText(tipText, hotSpotID);
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
