import React, { useRef, useState } from 'react';
import { Box } from '@material-ui/core';
import { createTooltipInProd } from 'pages/studio/components/HotSpot';
import { useRouteMatch } from 'react-router-dom';
import { message } from 'antd';
import { getWorkData } from 'requests/requests';
import { StudioPageParams } from 'routes/config';

import classes from './style.module.css';
import Iconfont from 'components/Iconfont';
const sceneStack: string[] = [];
const Play: React.FC = () => {
  const currentRoute = useRouteMatch<StudioPageParams>();
  const workID = currentRoute.params.workID;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const panellnumInstance = useRef<any>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [panoramaTourConfig, setPanoramaTourConfig] = useState<any>(null);

  const handleClickBack: () => void = () => {
    if (sceneStack.length > 0) {
      const latestSceneID = sceneStack.pop() || '';
      const targetScene = panoramaTourConfig.scenes[latestSceneID];
      if (targetScene) {
        panellnumInstance.current.loadScene(
          latestSceneID,
          targetScene.pitch || 0,
          targetScene.yaw || 0,
          targetScene.hfov || 100,
        );
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickHotSpot: (e: Event, hotSpot: any) => void = (_e: Event, hotSpot: any) => {
    if (hotSpot && hotSpot.toolName === 'Link') {
      sceneStack.push(panellnumInstance.current.getScene());
      console.log(sceneStack);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addHotSpotStyle = (config: any) => {
    const scenes = config.scenes;
    for (const key in scenes) {
      const hotSpots = scenes[key].hotSpots;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      scenes[key].hotSpots = hotSpots.map((item: any) => {
        item.createTooltipFunc = createTooltipInProd(item);
        item.clickHandlerArgs = item;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        item.clickHandlerFunc = handleClickHotSpot;
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
          setPanoramaTourConfig(res.data.panoramaTourConfig);
          const p = window.pannellum.viewer('panorama', addHotSpotStyle(res.data.panoramaTourConfig));
          panellnumInstance.current = p;
        }
      } catch (err) {
        message.warn(err.response?.data.message);
      }
    };
    fetchData();
  }, [workID]);
  return (
    <Box width="100vw" height="100vh" className={classes.wrapper}>
      <Box
        id="panorama"
        onContextMenuCapture={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      ></Box>
      <Box className={classes.control} onClick={() => handleClickBack()}>
        <Iconfont className={classes.backIcon} name="icon-shangyiyehoutuifanhui-yuankuang" color="#6b7174"></Iconfont>
      </Box>
    </Box>
  );
};

export default Play;
