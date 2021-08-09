import { IPannellum, IHotSpot } from 'types/pannellum/interface';
import classes from 'pages/studio/components/classes.module.css';
type HotSpot = {
  id: string;
  div: HTMLDivElement;
};

const hotSpots: HotSpot[] = [];

export const renderHotSpotToCanvas: (p: IPannellum | null, hotSpot: IHotSpot) => void = (
  p: IPannellum | null,
  hotSpot: IHotSpot,
) => {
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

export const updateHotSpotText: (text: string, id: string) => void = (text: string, id: string) => {
  const hotSpot: HotSpot | undefined = hotSpots.find((item) => item.id === id);
  if (hotSpot) {
    const { div } = hotSpot;
    const tipSpan: HTMLSpanElement | null = div.querySelector('span');
    tipSpan && (tipSpan.innerHTML = text);
  }
};
