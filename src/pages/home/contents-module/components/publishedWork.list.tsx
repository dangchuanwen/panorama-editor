import { Box } from '@material-ui/core';
import { Empty } from 'antd';
import { LanguageContext } from 'language';
import { FC, useContext } from 'react';
import { PublishedWork } from 'requests/requests';
import PublishedWorkItem from './publishedWork.item';

interface Props {
  publishedWorks: PublishedWork[];
  showEmpty?: boolean;
}

const PublishedWorkList: FC<Props> = ({ publishedWorks, showEmpty = true }: Props) => {
  const { languagePackage } = useContext(LanguageContext);
  const renderPublishedWork = () => {
    return publishedWorks.map((publishedWork, index) => {
      return <PublishedWorkItem key={index} publishedWork={publishedWork} />;
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