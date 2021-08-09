import { ICreateTooltipArgs, ICreateTooltipFunc } from 'types/pannellum/interface';
import classes from './classes.module.css';
import LinkIcon from 'assets/link.png';
import TipIcon from 'assets/tip.png';
import { ToolNames } from 'interface';

const ToolIcons: Map<ToolNames, string> = new Map();
ToolIcons.set(ToolNames.Link, LinkIcon);
ToolIcons.set(ToolNames.Tip, TipIcon);
export const createTooltip: (toolName: ToolNames, cb?: (div: HTMLDivElement) => void) => ICreateTooltipFunc = (
  toolName: ToolNames,
  cb?: (div: HTMLDivElement) => void,
) => {
  return (hotSpotDiv: HTMLDivElement, args: ICreateTooltipArgs) => {
    const iconImage: HTMLImageElement = document.createElement('img');
    const tipSpan: HTMLSpanElement = document.createElement('span');
    const ToolIcon = ToolIcons.get(toolName);
    if (ToolIcon === undefined) {
      throw new Error(`Not found icon: ${toolName}`);
    }

    tipSpan.innerHTML = args.text;
    hotSpotDiv.draggable = false;
    hotSpotDiv.classList.add(classes.hotSpot);
    iconImage.src = ToolIcon;
    iconImage.draggable = false;

    hotSpotDiv.appendChild(iconImage);
    hotSpotDiv.appendChild(tipSpan);

    // run callback function
    cb && cb(hotSpotDiv);
  };
};
