/* eslint-disable react/jsx-no-target-blank */
import React, { useContext } from 'react';
import { Box } from '@material-ui/core';
import { WorksWrapper, WorkItem, WorksBox, WorkThumbnail, WorksTitle, IconFont } from '../styled';
import { Work } from 'requests/requests';
import { Empty, Tag } from 'antd';
import { LanguageContext } from 'language';
type Props = {
  works: Work[];
  handleRemoveWork: (workdID: string) => void;
};
const Works: React.FC<Props> = ({ works, handleRemoveWork }: Props) => {
  const { languagePackage } = useContext(LanguageContext);
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
          <Box color="#333">
            <strong>{work.workName}</strong>
            {work.user.group && (
              <Tag style={{ marginLeft: '5px' }} color="#2db7f5">
                {work.user.group}
              </Tag>
            )}
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
          <Box bgcolor="#2b3133" className="deleteBox" display="none" justifyContent="center" alignItems="center">
            <IconFont
              onClick={() => handleRemoveWork(work._id)}
              style={{ color: 'white' }}
              className="iconfont icon-delete-fill"
            ></IconFont>
          </Box>
        </WorkItem>
      );
    });
  };
  return (
    <WorksWrapper>
      <WorksTitle>{languagePackage?.AllMyWorks}</WorksTitle>
      <WorksBox>{renderWorkItems()}</WorksBox>
      {works.length === 0 && (
        <Empty description={<span style={{ color: 'gray' }}>{languagePackage?.YouHaveNotCreatedAWorkYet}</span>} />
      )}
    </WorksWrapper>
  );
};

export default Works;
