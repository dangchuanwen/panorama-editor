import { IPannellum, IHotSpot } from 'types/pannellum/interface';
import classes from 'pages/studio/components/classes.module.css';
type HotSpot = {
  id: string;
  div: HTMLDivElement;
  text: string;
};

let canvas: IPannellum | null;
const hotSpots: HotSpot[] = [];

export const renderHotSpotToCanvas: (p: IPannellum | null, hotSpot: IHotSpot) => void = (
  p: IPannellum | null,
  hotSpot: IHotSpot,
) => {
  canvas = p;
  p?.addHotSpot(hotSpot);
};

export const addHotSpot: (hotSpotInfo: HotSpot) => void = (hotSpotInfo: HotSpot) => {
  if (!hotSpots.find((hotspot) => hotspot.id === hotSpotInfo.id)) {
    hotSpots.push(hotSpotInfo);
  }
};

export const outStandClickedHotSpot: (hotSpotID: string) => void = (hotSpotID: string) => {
  for (const hotSpot of hotSpots) {
    const { id, div } = hotSpot;
    if (id !== hotSpotID) {
      div.classList.remove(classes.activatedHotSpot);
    } else {
      div.classList.add(classes.activatedHotSpot);
    }
  }
};

export const unOutStandAllHotSpots: () => void = () => {
  for (const hotSpot of hotSpots) {
    const { div } = hotSpot;
    div.classList.remove(classes.activatedHotSpot);
  }
};

export const updateHotSpotText: (text: string, id: string) => void = (text: string, id: string) => {
  const hotSpot: HotSpot | undefined = hotSpots.find((item) => item.id === id);
  if (hotSpot) {
    const { div } = hotSpot;
    const tipSpan: HTMLSpanElement | null = div.querySelector('span');
    tipSpan && (tipSpan.innerHTML = text);
    hotSpot.text = text;
  }
};

export const removeHotSpot: (id: string) => void = (id: string) => {
  if (canvas) {
    canvas.removeHotSpot(id);
  }
};

export const getHotSpotById: (id: string) => HotSpot | undefined = (id: string) => {
  const hotSpot: HotSpot | undefined = hotSpots.find((item) => item.id === id);
  return hotSpot;
};
