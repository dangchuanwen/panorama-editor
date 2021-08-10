import React from 'react';
import { RouteProps } from 'react-router';
export type IHOCRoute = React.FC<RouteProps>;
export enum HOCRouteTypes {
  public,
  protected,
}
export enum ToolNames {
  Link = 'Link',
  Tip = 'Tip',
}
export type QiniuCompeleteRes = {
  key: string;
  hash: string;
};
