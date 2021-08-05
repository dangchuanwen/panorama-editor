import styled from 'styled-components';
import { Box, Container as MatContainer } from '@material-ui/core';

export const Wrapper = styled(Box)`
  width: 100vw;
  height: 100vh;
  background-color: #dee1e7;

  display: grid;
  grid-template-columns: calc(100vw - 30px);
  grid-template-rows: calc(100vh - 30px);
  justify-content: center;
  align-content: center;
`;

export const Container = styled(MatContainer)`
  box-sizing: border-box;
  border-radius: 20px;
  overflow: hidden;
  padding: 0px !important;
  background-color: white;

  display: grid !important;
  grid-template-columns: 5.5vw calc(100% - 5.5vw);
  grid-template-rows: 5.5vw calc(100% - 5.5vw);
`;

export const LogoBox = styled(Box)`
  border-right: 1px solid #dee1e7;
  border-bottom: 1px solid #dee1e7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.img`
  width: 40%;
`;

export const HeaderBox = styled(Box)`
  border-bottom: 1px solid #dee1e7;
  padding: 16px;
  display: flex;
  align-items: center;
`;

export const MenuBox = styled(Box)`
  border-right: 1px solid #dee1e7;
  border-bottom: 1px solid #dee1e7;
  padding: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContentBox = styled(Box)`
  padding: 20px;
  border-bottom: 1px solid #dee1e7;
`;
