/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { Box } from '@material-ui/core';
import { WorksWrapper, WorkItem, WorksBox, WorkThumbnail, WorksTitle, IconFont } from '../styled';
import { Work } from 'requests/requests';
type Props = {
  works: Work[];
};
const Works: React.FC<Props> = ({ works }: Props) => {
  const imagePlaceholder = `http://icetnnu.ltd/u%3D861387783%2C2279533978%26fm%3D26%26fmt%3Dauto%26gp%3D0.webp`;
  const renderWorkItems = () => {
    return works.map((work) => {
      const firstScene = work.panoramaTourConfig?.default.firstScene;
      const firstSceneImage = work.panoramaTourConfig?.scenes[firstScene].panorama;
      return (
        <WorkItem key={work.workName}>
          <Box>
            <WorkThumbnail src={firstSceneImage || imagePlaceholder} />
          </Box>
          <Box color="#333" fontWeight="bold">
            {work.workName}
          </Box>
          <Box display="flex" flexDirection="column">
            <a href={`/studio/${work._id}`} target="_blank">
              <IconFont style={{ color: '#1296db' }} className="iconfont icon-bianji"></IconFont>
            </a>
            {work.panoramaTourConfig && (
              <a href={`/play/${work._id}`} target="_blank">
                <IconFont style={{ color: '#d4237a' }} className="iconfont icon-yulan"></IconFont>
              </a>
            )}
          </Box>
        </WorkItem>
      );
    });
  };
  return (
    <WorksWrapper>
      <WorksTitle>我的所有作品</WorksTitle>
      <WorksBox>{renderWorkItems()}</WorksBox>
    </WorksWrapper>
  );
};

export default Works;
