import React from 'react';
import { useLocation } from 'react-router-dom';
import { getWorkData } from 'requests/requests';
import { importPanoramaTourConfig } from 'utils';
import { IPanoramaImage, IStudioState, useStudioState } from './state';
interface IProps {
  children?: JSX.Element | JSX.Element[];
}

export const StudioContext = React.createContext<IStudioState>({} as IStudioState);

export const StudioContextWrapper: React.FC<IProps> = ({ children }: IProps) => {
  const { pathname } = useLocation();
  const workID = pathname.split('/')[2];
  const studioState: IStudioState = useStudioState();
  React.useEffect(() => {
    const fetchData = async () => {
      const res = await getWorkData(workID);
      const panoramaImages: IPanoramaImage[] = importPanoramaTourConfig(res && res.data && res.data.panoramaTourConfig);
      studioState.initPanoramaImages(panoramaImages);
    };
    fetchData();
  }, [workID]);

  return <StudioContext.Provider value={studioState}>{children}</StudioContext.Provider>;
};
