import { Box, Button } from '@material-ui/core';
import { message } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { FC } from 'react';
import { getPublishedWorksBeforeArchorDate, PublishedWork } from 'requests/requests';
import PublishedWorkList from './components/publishedWork.list';

const Exhibition: FC = () => {
  const [archorDate, setArchorDate] = useState<Date>(new Date());
  const [publishedWorks, setPublishedWorks] = useState<PublishedWork[]>([]);
  const handleClickLoadMore = () => {
    const earliestPublishedWork = publishedWorks[publishedWorks.length - 1];
    if (earliestPublishedWork) {
      setArchorDate(earliestPublishedWork.createdTime);
    }
  };
  useEffect(() => {
    const fetchPublishedWorksBeforeArchorDate = async () => {
      try {
        const res = await getPublishedWorksBeforeArchorDate(archorDate);
        if (res && res.data) {
          const newPublishedWorks = [...publishedWorks, ...res.data];
          setPublishedWorks(newPublishedWorks);
          if (res.data.length === 0) {
            message.warn('没有更多数据了');
          }
        }
      } catch (err) {
        message.error(err.response.message);
      }
    };
    fetchPublishedWorksBeforeArchorDate();
  }, [archorDate]);
  return (
    <Box width="60%" padding="1vw" maxHeight="80vh" overflow="auto">
      <PublishedWorkList publishedWorks={publishedWorks} />
      <Box marginLeft="30%">
        <Button variant="contained" onClick={handleClickLoadMore}>
          加载更多
        </Button>
      </Box>
    </Box>
  );
};

export default Exhibition;
