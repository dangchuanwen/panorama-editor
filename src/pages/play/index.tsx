import React from 'react';
import { Box } from '@material-ui/core';
import { createTooltipInProd } from 'pages/studio/components/HotSpot';
const config = {
  default: {
    firstScene: '35734937073',
  },
  scenes: {
    '35734937073': {
      autoLoad: true,
      type: 'equirectangular',
      panorama: 'http://icetnnu.ltd/Fo2nDFxNrz1XN62PioZ5t-jq6_Ix',
      hotSpots: [
        {
          yaw: -36.89138348973188,
          pitch: 31.25079741952494,
          toolName: 'Tip',
          type: 'info',
          text: 'dwqd ',
        },
        {
          yaw: -14.563083419855444,
          pitch: 39.71960125749041,
          toolName: 'Link',
          type: 'scene',
          text: 'dwq ',
          sceneId: '696979596697',
        },
      ],
    },
    '696979596697': {
      type: 'equirectangular',
      panorama: 'http://icetnnu.ltd/lkkrEE4HBKa8KpYqPSSsBvrfWYUi',
      hotSpots: [],
    },
  },
};
const Play: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addHotSpotStyle = (config: any) => {
    const scenes = config.scenes;
    for (const key in scenes) {
      const hotSpots = scenes[key].hotSpots;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      scenes[key].hotSpots = hotSpots.map((item: any) => {
        item.createTooltipFunc = createTooltipInProd(item.toolName, item.text);
        return item;
      });
    }
    return config;
  };
  React.useEffect(() => {
    window.pannellum.viewer('panorama', addHotSpotStyle(config));
  }, []);
  return <Box id="panorama" width="100vw" height="100vh"></Box>;
};

export default Play;
