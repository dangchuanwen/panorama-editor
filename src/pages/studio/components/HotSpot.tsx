import { ICreateTooltipFunc } from 'types/pannellum/interface';
import classes from './classes.module.css';
import LinkIcon from 'assets/link.png';
import TipIcon from 'assets/tip.png';
import { ToolNames } from 'interface';
import { HotSpot } from '../state/state';

const ToolIcons: Map<ToolNames, string> = new Map();
ToolIcons.set(ToolNames.Link, LinkIcon);
ToolIcons.set(ToolNames.Tip, TipIcon);

const createTooltip = (hotSpotDiv: HTMLDivElement, hotSpot: HotSpot): void => {
  const toolName = hotSpot.toolName;

  const tipSpan: HTMLSpanElement = document.createElement('span');
  tipSpan.innerHTML = hotSpot.text || '';
  hotSpotDiv.draggable = false;
  hotSpotDiv.classList.add(classes.hotSpot);
  switch (toolName) {
    case ToolNames.Link:
    case ToolNames.Tip:
      const ToolIcon = ToolIcons.get(toolName) || '';
      const iconImage: HTMLImageElement = document.createElement('img');
      iconImage.src = ToolIcon;
      iconImage.draggable = false;
      hotSpotDiv.classList.add(classes.iconHotSpot);
      hotSpotDiv.appendChild(iconImage);
      break;
    case ToolNames.Font:
      const fontTag: HTMLParagraphElement = document.createElement('p');
      fontTag.draggable = false;
      fontTag.innerHTML = hotSpot.fontContent || '';
      hotSpotDiv.classList.add(classes.fontHotSpot);
      fontTag.classList.add(classes.fontTag);
      hotSpotDiv.appendChild(fontTag);
      break;
  }

  hotSpotDiv.appendChild(tipSpan);
};

export const createTooltipInProd = (hotSpot: HotSpot) => {
  return (hotSpotDiv: HTMLDivElement): void => {
    createTooltip(hotSpotDiv, hotSpot);
  };
};
export const createTooltipInDev: (
  toolName: ToolNames,
  hotSpot: HotSpot,
  cb?: (div: HTMLDivElement) => void,
) => ICreateTooltipFunc = (_toolName: ToolNames, hotSpot: HotSpot, cb?: (div: HTMLDivElement) => void) => {
  return (hotSpotDiv: HTMLDivElement) => {
    createTooltip(hotSpotDiv, hotSpot);
    hotSpot.activated && hotSpotDiv.classList.add(classes.activatedHotSpot);

    // run callback function
    cb && cb(hotSpotDiv);
  };
};
