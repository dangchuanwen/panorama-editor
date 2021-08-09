import React from 'react';
import { Box, TextField, Button, Select, MenuItem } from '@material-ui/core';
import { Title } from './styled';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { ToolNames } from 'interface';
import { IClickHandlerArgs } from 'types/pannellum/interface';
import { IPubSubEvents, Publish, PubSubEvents, Subscribe } from 'pages/studio/pub-sub';
import RemoveConfirm from 'components/Confirm';

const PropertyBar: React.FC = () => {
  let inputTimer: ReturnType<typeof setTimeout> | null = null;
  const [toolName, setToolName] = React.useState<ToolNames>(ToolNames.Tip);
  const [targetPanoramaImage, setTargetPanoramaImage] = React.useState<string>('');
  const [tipText, setTipText] = React.useState<string>('');
  const [hotSpotID, setHotSpotID] = React.useState<string>('');
  const [open, setOpen] = React.useState<boolean>(false);

  const handleInputTip = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTipText(e.target.value);
    clearTimeout(inputTimer as ReturnType<typeof setTimeout>);
    inputTimer = setTimeout(() => {
      /** publish 'input-tip-text' event, subscriber in canvas module */
      if (hotSpotID) {
        Publish(PubSubEvents.InputTipText, e.target.value, hotSpotID);
      }
    }, 100);
  };

  const handleCancelRemove = () => {
    setOpen(false);
  };
  const handleConfirmRemove = () => {
    Publish(PubSubEvents.RemouveHotSpot, hotSpotID);
    setHotSpotID('');
    setOpen(false);
  };
  const handleClickDeleteBtn = () => {
    setOpen(true);
  };

  const handleSelectTargetPanoramaImage = (e: React.ChangeEvent<{ value: unknown }>) => {
    setTargetPanoramaImage(e.target.value as string);
  };

  React.useEffect(() => {
    /** subscribe click-hot-spot event, publisher in canvas module */
    Subscribe<IPubSubEvents['ClickHotSpot']>(PubSubEvents.ClickHotSpot, (hotSpotInfo: IClickHandlerArgs) => {
      if (hotSpotInfo) {
        // sub function
        setToolName(hotSpotInfo.toolName);
        setTipText(hotSpotInfo.text);
        setHotSpotID(hotSpotInfo.id);
      }
    });
  }, []);

  return (
    <Box height="100%">
      {hotSpotID && (
        <Box>
          <Title>标签内容</Title>
          <TextField
            value={tipText}
            onInput={handleInputTip}
            fullWidth
            id="outlined-multiline-static"
            label="修改标签文字"
            multiline
            rows={4}
            variant="outlined"
          />
        </Box>
      )}
      {hotSpotID && toolName === ToolNames.Link && (
        <Box marginTop="20px" maxWidth="70%">
          <Title>目标图片</Title>
          <Select
            value={targetPanoramaImage}
            onChange={handleSelectTargetPanoramaImage}
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </Box>
      )}
      {hotSpotID && (
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
      )}
      <RemoveConfirm
        open={open}
        onCancel={handleCancelRemove}
        onConfirm={handleConfirmRemove}
        title="提示"
        text="确定删除？"
      />
    </Box>
  );
};

export default PropertyBar;
