import styled from 'styled-components';

import { Box } from '@material-ui/core';

export const Wrapper = styled(Box)`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 10% 90%;
`;

export const OperationWrapper = styled(Box)`
  display: flex;
  align-items: center;
`;

export const WorksWrapper = styled(Box)`
  display: grid;
  grid-auto-columns: 100%;
  grid-template-rows: 10% auto;
`;

export const WorksTitle = styled.h2``;

export const WorksBox = styled.ul`
  list-style: none;
`;

export const IconFont = styled.i`
  cursor: pointer;
  margin-bottom: 10px;
  font-size: 1.5vw;
  display: none;
`;

export const WorkItem = styled.li`
  margin-bottom: 15px;
  width: 24vw;
  height: 9vh;
  display: grid;
  grid-template-columns: 5vw 10vw 3vw 1fr;
  grid-template-rows: 100%;
  gap: 1vw;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  &:hover ${IconFont} {
    display: inline;
  }
  &:hover .deleteBox {
    display: flex;
  }
  &:hover {
    box-shadow: 0 0 10px gray;
  }
  box-shadow: 0 0 10px gray;
`;

export const WorkThumbnail = styled.img`
  width: 100%;
  height: 100%;
`;
