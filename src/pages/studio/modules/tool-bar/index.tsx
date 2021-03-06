import React, { useContext } from 'react';
import { Box, Tooltip, makeStyles, TextField } from '@material-ui/core';
import Iconfont from 'components/Iconfont';
import { ToolNames } from 'interface';
import { useRouteMatch } from 'react-router';
import { StudioContext } from 'pages/studio/state/context';
import { message, Modal } from 'antd';
import { StudioPageParams } from 'routes/config';
import { useState } from 'react';
import { getUserPublishedWorkByWorkID, publishWork } from 'requests/requests';
import { LanguageContext } from 'language';

const useStylesBootstrap = makeStyles(() => ({
  tooltip: {
    padding: '10px 15px',
    fontSize: '0.7vw',
  },
}));

const ToolBar: React.FC = () => {
  const { languagePackage } = useContext(LanguageContext);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [introduction, setIntroduction] = useState('');
  const {
    params: { workID },
  } = useRouteMatch<StudioPageParams>();
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserPublishedWorkByWorkID(workID);
        if (res && res.data) {
          setIntroduction(res.data.introduction);
        }
      } catch (err) {
        message.error(err.response?.data.message);
      }
    };
    fetchData();
  }, [workID]);

  const { uploadPanoramaTourConfig, panoramaImages } = React.useContext(StudioContext);
  const currentRoute = useRouteMatch<StudioPageParams>();
  const classes = useStylesBootstrap();
  const handleClickPublish = async () => {
    setShowPublishDialog(true);
  };
  const handleConfirmPublish = async () => {
    if (!introduction) {
      message.warn(languagePackage?.PleaseAddIntroductionHere);
      return;
    }
    if (panoramaImages.length === 0) {
      message.warn(languagePackage?.PleaseImportPanoramicImage);
      return;
    }
    try {
      await publishWork(workID, introduction);
      message.success(languagePackage?.PublishSuccessfully);
    } catch (err) {
      message.error(err.response?.data.message);
    } finally {
      setShowPublishDialog(false);
    }
  };
  const handleClickSave = async () => {
    try {
      await uploadPanoramaTourConfig();
      message.success(languagePackage?.SaveSuccessfully);
    } catch (err) {
      message.warn(err.response?.data.message);
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
      <Tooltip title={languagePackage?.TextTag || ''} classes={classes} placement="top" arrow={true}>
        <Box marginRight="20px" draggable onDragStart={(e) => handleDragStart(e, ToolNames.Font)}>
          <Iconfont name="icon-wenzi" color="#f46a12" fontSize="1.7vw" />
        </Box>
      </Tooltip>
      <Tooltip title={languagePackage?.Tag || ''} classes={classes} placement="top" arrow={true}>
        <Box marginRight="20px" draggable onDragStart={(e) => handleDragStart(e, ToolNames.Tip)}>
          <Iconfont name="icon-tishi1" color="#1296db" fontSize="1.7vw" />
        </Box>
      </Tooltip>
      <Tooltip title={languagePackage?.Link || ''} classes={classes} placement="top" arrow={true}>
        <Box draggable onDragStart={(e) => handleDragStart(e, ToolNames.Link)}>
          <Iconfont name="icon-xiangshangjiantouquan" color="#1AFA29" fontSize="1.7vw" />
        </Box>
      </Tooltip>
      <Tooltip title={languagePackage?.Preview || ''} classes={classes} placement="top" arrow={true}>
        <Box marginLeft="20px" onClick={handleClickPlay}>
          <Iconfont name="icon-play-01" color="#bd8cbb" fontSize="1.6vw" />
        </Box>
      </Tooltip>
      <Tooltip title={languagePackage?.SaveAndUpload || ''} classes={classes} placement="top" arrow={true}>
        <Box marginLeft="80px" onClick={() => handleClickSave()}>
          <Iconfont name="icon-shangchuan" color="#00A99D" fontSize="1.6vw" />
        </Box>
      </Tooltip>
      <Tooltip title={languagePackage?.Publish || ''} classes={classes} placement="top" arrow={true}>
        <Box marginLeft="20px" onClick={() => handleClickPublish()}>
          <Iconfont name="icon-fabu" color="#37daf6" fontSize="1.6vw" />
        </Box>
      </Tooltip>
      <Modal
        title={languagePackage?.PublishWork || ''}
        keyboard
        centered
        visible={showPublishDialog}
        cancelText={languagePackage?.Cancel}
        okText={languagePackage?.Publish}
        onOk={() => handleConfirmPublish()}
        onCancel={() => setShowPublishDialog(false)}
      >
        <TextField
          value={introduction}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => setIntroduction(e.target.value)}
          label={languagePackage?.AddIntroductionHere}
          fullWidth
          helperText={languagePackage?.AddingIntroductionWillTakeBetterExperienceToOthers}
          variant="outlined"
          minRows={4}
          multiline
        />
      </Modal>
    </Box>
  );
};

export default ToolBar;
