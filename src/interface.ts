import React from 'react';
import { RouteProps } from 'react-router';
export type IHOCRoute = React.FC<RouteProps>;
export enum HOCRouteTypes {
  public,
  protected,
}
