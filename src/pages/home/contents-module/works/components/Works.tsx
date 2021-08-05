import React from 'react';
import { Box } from '@material-ui/core';
import { WorksWrapper, WorkItem, WorksBox, WorkThumbnail, WorksTitle, IconFont } from '../styled';
const Works: React.FC = () => {
  return (
    <WorksWrapper>
      <WorksTitle>我的所有作品</WorksTitle>
      <WorksBox>
        <WorkItem>
          <Box>
            <WorkThumbnail src="https://cdn.dribbble.com/users/2253180/screenshots/15666533/media/77bd7cb2190bc8f066a5a689a007a5a8.jpg" />
          </Box>
          <Box color="#333" fontWeight="bold">
            我的第一个全景漫游作品
          </Box>
          <Box display="flex" flexDirection="column">
            <a href="/studio" target="_blank">
              <IconFont style={{ color: '#1296db' }} className="iconfont icon-bianji"></IconFont>
            </a>
            <IconFont style={{ color: '#d4237a' }} className="iconfont icon-yulan"></IconFont>
          </Box>
        </WorkItem>
      </WorksBox>
    </WorksWrapper>
  );
};

export default Works;
