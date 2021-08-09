import { IClickHandlerArgs } from 'types/pannellum/interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SubFunction = (...args: any[]) => any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PubArgs = any[];

const registry: Map<string, SubFunction[]> = new Map();

export enum PubSubEvents {
  ClickHotSpot = 'click-hot-spot',
  InputTipText = 'input-tip-text',
  RemouveHotSpot = 'remove-hot-spot',
}

export interface IPubSubEvent {
  subFn: SubFunction;
  pubArgs: PubArgs;
}

/** all pub sub event  */
export interface IPubSubEvents {
  ClickHotSpot: {
    subFn: (hotSpotInfo: IClickHandlerArgs) => void;
    pubArgs: [IClickHandlerArgs];
  };
  InputTipText: {
    subFn: (tipText: string, hotSpotID: string) => void;
    pubArgs: [string];
  };
  RemoveHotSpot: {
    subFn: (hotSpotID: string) => void;
    pubArgs: [string];
  };
}
/**------------------------------------- */

export const Subscribe: <T extends IPubSubEvent>(e: string, fn: T['subFn']) => void = <T extends IPubSubEvent>(
  eventName: string,
  fn: T['subFn'],
) => {
  if (!registry.has(eventName)) {
    registry.set(eventName, []);
  }
  registry.get(eventName)?.push(fn);
};

export const Publish: <T extends IPubSubEvent>(e: string, ...args: T['pubArgs']) => void = <T extends IPubSubEvent>(
  eventName: string,
  ...args: T['pubArgs']
) => {
  const subFunctions: SubFunction[] = registry.get(eventName) || [];
  for (const subFunction of subFunctions) {
    subFunction(...args);
  }
};
