import { Box } from '@material-ui/core';
import { FC } from 'react';
import { PublishedWork } from 'requests/requests';
import PublishedWorkItem from './publishedWork.item';

interface Props {
  publishedWorks: PublishedWork[];
}

const PublishedWorkList: FC<Props> = ({ publishedWorks }: Props) => {
  const renderPublishedWork = () => {
    return publishedWorks.map((publishedWork, index) => {
      return <PublishedWorkItem key={index} publishedWork={publishedWork} />;
    });
  };
  return <Box width="100%">{renderPublishedWork()}</Box>;
};

export default PublishedWorkList;
