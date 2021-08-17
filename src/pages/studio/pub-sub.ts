// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SubFunction = (...args: any[]) => any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PubArgs = any[];

let registry: Map<string, SubFunction[]> = new Map();

export enum PubSubEventNames {
  /** Image  */
  // ImageBar module to state
  ChooseImage = 'ChooseImage',
  ClickImage = 'ClickImage',
  RemoveImage = 'RemoveImage',
  // State to Canvas module
  UpdateImage = 'UpdateImage',

  /** HotSpot  */
  // Canvas module to state
  AddHotSpot = 'AddHotSpot',
  ClickHotSpot = 'ClickHotSpot',
  ClickCanvas = 'ClickCanvas',
  // State to Property module
  RenderHotSpotOnProperty = 'RenderHotSpotOnProperty',
  // Property module to State
  UpdateHotSpot = 'UpdateHotSpot',
  RemoveHotSpot = 'RemoveHotSpot',
  // State to Canvas module
  RenderHotSpotOnCanvas = 'RenderHotSpotOnCanvas',
}

export interface IPubSubEvent {
  subFn: SubFunction;
  pubArgs: PubArgs;
}

export const clearRegistry: () => void = () => {
  registry = new Map();
};

/** all pub sub event  */
export interface PubSubEvents {
  [PubSubEventNames.ChooseImage]: {
    subFn: () => void;
    pubArgs: [];
  };
}

/**------------------------------------- */

export const Subscribe: <T extends IPubSubEvent>(e: PubSubEventNames, fn: T['subFn']) => void = <
  T extends IPubSubEvent,
>(
  eventName: PubSubEventNames,
  fn: T['subFn'],
) => {
  if (!registry.has(eventName)) {
    registry.set(eventName, []);
  }
  registry.get(eventName)?.push(fn);
};
export const Publish: <T extends IPubSubEvent>(e: PubSubEventNames, ...args: T['pubArgs']) => void = <
  T extends IPubSubEvent,
>(
  eventName: PubSubEventNames,
  ...args: T['pubArgs']
) => {
  const subFunctions: SubFunction[] = registry.get(eventName) || [];
  for (const subFunction of subFunctions) {
    subFunction(...args);
  }
};
