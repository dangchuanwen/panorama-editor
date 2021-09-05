import React from 'react';
import { Box, TextField, Button, Select, MenuItem } from '@material-ui/core';
import { Title } from './styled';
import { Delete as DeleteIcon } from '@material-ui/icons';

import { StudioContext } from 'pages/studio/state/context';
import { HotSpot, IPanoramaImage } from 'pages/studio/state/state';
import { ToolNames } from 'interface';

const PropertyBar: React.FC = () => {
  const { panoramaImages, updateActivatedHotSpot, removeActivatedHotSpot } = React.useContext(StudioContext);
  const activatedImage: IPanoramaImage | undefined = panoramaImages.find((item) => item.activated);
  const hotSpotsOfActivatedImage = (activatedImage && activatedImage.hotSpots) || [];
  const activatedHotSpot = hotSpotsOfActivatedImage.find((item) => item.activated);
  const handleInputTip: (activatedHotSpot: HotSpot, newText: string) => void = (
    activatedHotSpot: HotSpot,
    newText: string,
  ) => {
    activatedHotSpot.text = newText;
    updateActivatedHotSpot(activatedHotSpot);
  };
  const handleInputFontContent: (activatedHotSpot: HotSpot, newContent: string) => void = (
    activatedHotSpot: HotSpot,
    newContent: string,
  ) => {
    activatedHotSpot.fontContent = newContent;
    updateActivatedHotSpot(activatedHotSpot);
  };

  const handleClickDeleteBtn = () => {
    if (activatedHotSpot) {
      removeActivatedHotSpot(activatedHotSpot.id);
    }
  };

  const handleSelectTargetPanoramaImage: (activatedHotSpot: HotSpot, nextSceneID: string) => void = (
    activatedHotSpot: HotSpot,
    nextSceneID: string,
  ) => {
    activatedHotSpot.targetID = nextSceneID;
    updateActivatedHotSpot(activatedHotSpot);
  };
  return (
    <>
      {activatedHotSpot && (
        <Box height="100%">
          {activatedHotSpot.toolName === ToolNames.Font && (
            <Box>
              <Title>标签文本</Title>
              <TextField
                value={activatedHotSpot.fontContent || ''}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleInputFontContent(activatedHotSpot, e.target.value);
                }}
                fullWidth
                id="outlined-multiline-static"
                label="修改标签文字"
                multiline
                rows={4}
                variant="outlined"
              />
            </Box>
          )}
          <Box marginTop="3vh">
            <Title>标签内容</Title>
            <TextField
              value={activatedHotSpot.text}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleInputTip(activatedHotSpot, e.target.value);
              }}
              fullWidth
              id="outlined-multiline-static"
              label="修改标签文字"
              multiline
              rows={4}
              variant="outlined"
            />
          </Box>
          {activatedHotSpot.toolName === ToolNames.Link && (
            <Box marginTop="20px" maxWidth="70%">
              <Title>目标图片</Title>
              <Select
                value={activatedHotSpot.targetID || ''}
                onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                  handleSelectTargetPanoramaImage(activatedHotSpot, e.target.value as string);
                }}
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                {panoramaImages.reduce<JSX.Element[]>((prev, next, index) => {
                  if (!next.activated) {
                    prev.push(<MenuItem value={next.id}>第 {index + 1} 张</MenuItem>);
                  }
                  return prev;
                }, [])}
              </Select>
            </Box>
          )}
          <Box marginTop="50px">
            <Button
              onClick={() => handleClickDeleteBtn()}
              variant="contained"
              fullWidth
              color="secondary"
              startIcon={<DeleteIcon />}
            >
              删除
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default PropertyBar;
