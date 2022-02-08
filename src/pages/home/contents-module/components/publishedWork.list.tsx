import { Box } from '@material-ui/core';
import { Empty } from 'antd';
import { LanguageContext } from 'language';
import { FC, useContext } from 'react';
import { PublishedWorksContext } from '../contexts';
import PublishedWorkItem from './publishedWork.item';

const PublishedWorkList: FC = () => {
  const { languagePackage } = useContext(LanguageContext);
  const { publishedWorks, showEmpty } = useContext(PublishedWorksContext);
  const renderPublishedWork = () => {
    return publishedWorks.map((publishedWork) => {
      return <PublishedWorkItem key={publishedWork._id} publishedWork={publishedWork} />;
    });
  };
  return (
    <Box width="100%">
      {renderPublishedWork()}
      {showEmpty && publishedWorks.length === 0 && (
        <Empty description={<span style={{ color: 'gray' }}>{languagePackage?.NoDatasYet}</span>} />
      )}
    </Box>
  );
};

export default PublishedWorkList;
