import React from 'react';
import { Box, Tooltip, makeStyles } from '@material-ui/core';
import Iconfont from 'components/Iconfont';
import { ToolNames } from 'interface';
import { useRouteMatch } from 'react-router';
import { StudioContext } from 'pages/studio/state/context';
import { message } from 'antd';
import { StudioPageParams } from 'routes/config';

const useStylesBootstrap = makeStyles(() => ({
  tooltip: {
    padding: '10px 15px',
    fontSize: '0.7vw',
  },
}));

const ToolBar: React.FC = () => {
  const { uploadPanoramaTourConfig } = React.useContext(StudioContext);
  const currentRoute = useRouteMatch<StudioPageParams>();
  const classes = useStylesBootstrap();
  const handleClickSave = async () => {
    try {
      await uploadPanoramaTourConfig();
      message.success('保存成功！');
    } catch (err) {
      message.warn(err.response.message);
    }
  };
  const handleClickPlay = () => {
    open(`/play/${currentRoute.params.workID}`);
  };
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
      <Tooltip title="预览" classes={classes} placement="top" arrow={true}>
        <Box marginLeft="20px" onClick={handleClickPlay}>
          <Iconfont name="icon-play-01" color="#bd8cbb" fontSize="1.6vw" />
        </Box>
      </Tooltip>
      <Tooltip title="保存并上传" classes={classes} placement="top" arrow={true}>
        <Box marginLeft="80px" onClick={() => handleClickSave()}>
          <Iconfont name="icon-shangchuan" color="#00A99D" fontSize="1.6vw" />
        </Box>
      </Tooltip>
    </Box>
  );
};

export default ToolBar;
