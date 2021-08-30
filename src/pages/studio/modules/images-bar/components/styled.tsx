import styled from 'styled-components';
import { Box } from '@material-ui/core';

export const Wrapper = styled(Box)`
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Image = styled.img`
  width: 100%;
  height: 80px;
`;

export const SliderBox = styled(Box)`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  height: 80px;
  transition: 0.3s;
`;

export const ImageBox = styled(Box)`
  position: relative;
  margin-top: 10px;
  width: 80%;
  height: 80px;
  overflow: hidden;
  cursor: pointer;
`;
