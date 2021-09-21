import React from 'react';
import { Box } from '@material-ui/core';
import { createTooltipInProd } from 'pages/studio/components/HotSpot';
import { useRouteMatch } from 'react-router-dom';
import { message } from 'antd';
import { getWorkData } from 'requests/requests';
import { StudioPageParams } from 'routes/config';

const Play: React.FC = () => {
  const currentRoute = useRouteMatch<StudioPageParams>();
  const workID = currentRoute.params.workID;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addHotSpotStyle = (config: any) => {
    const scenes = config.scenes;
    for (const key in scenes) {
      const hotSpots = scenes[key].hotSpots;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      scenes[key].hotSpots = hotSpots.map((item: any) => {
        item.createTooltipFunc = createTooltipInProd(item);
        return item;
      });
    }
    return config;
  };
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getWorkData(workID);
        if (res && res.data && res.data.panoramaTourConfig) {
          window.pannellum.viewer('panorama', addHotSpotStyle(res.data.panoramaTourConfig));
        }
      } catch (err) {
        message.warn(err.response?.data.message);
      }
    };
    fetchData();
  }, [workID]);
  return <Box id="panorama" width="100vw" height="100vh"></Box>;
};

export default Play;
