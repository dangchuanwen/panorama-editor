import { Box } from '@material-ui/core';
import styled from 'styled-components';

export const MenuItem = styled(Box)`
  border-radius: 15%;
  margin-top: 2vh;
  width: 3vw;
  height: 3vw;
  transition: 0.3s;
  background-color: #f1619b;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;
export const MenuIcon = styled.i`
  color: white;
  font-size: 1.3vw;
  transition: 0.3s;
`;
