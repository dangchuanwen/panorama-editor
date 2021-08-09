import React from 'react';
import { Box, Tooltip, makeStyles } from '@material-ui/core';
import Iconfont from 'components/Iconfont';
import { ToolNames } from 'interface';
const useStylesBootstrap = makeStyles(() => ({
  tooltip: {
    padding: '10px 15px',
    fontSize: '0.7vw',
  },
}));

const ToolBar: React.FC = () => {
  const classes = useStylesBootstrap();
  const handleDragStart = (e: React.DragEvent, toolName: ToolNames) => {
    e.dataTransfer.setData('toolName', toolName);
  };
  return (
    <Box width="100%" height="100%" display="flex" alignItems="center">
      <Tooltip title="标签" classes={classes} placement="top" arrow={true}>
        <Box marginRight="20px" draggable onDragStart={(e) => handleDragStart(e, ToolNames.Tip)}>
          <Iconfont name="icon-tishi1" color="#1296db" fontSize="1.7vw" />
        </Box>
      </Tooltip>
      <Tooltip title="链接" classes={classes} placement="top" arrow={true}>
        <Box draggable onDragStart={(e) => handleDragStart(e, ToolNames.Link)}>
          <Iconfont name="icon-xiangshangjiantouquan" color="#1AFA29" fontSize="1.7vw" />
        </Box>
      </Tooltip>
    </Box>
  );
};

export default ToolBar;
