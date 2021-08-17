import React from 'react';
import { IStudioState, useStudioState } from './state';
interface IProps {
  children?: JSX.Element | JSX.Element[];
}

export const StudioContext = React.createContext<IStudioState>({} as IStudioState);

export const StudioContextWrapper: React.FC<IProps> = ({ children }: IProps) => {
  const studioState: IStudioState = useStudioState();
  return <StudioContext.Provider value={studioState}>{children}</StudioContext.Provider>;
};
