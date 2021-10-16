import { Box, Button } from '@material-ui/core';
import { message } from 'antd';
import { LanguageContext } from 'language';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { FC } from 'react';
import { getPublishedWorksBeforeArchorDate, PublishedWork } from 'requests/requests';
import PublishedWorkList from '../components/publishedWork.list';

const Exhibition: FC = () => {
  const { languagePackage } = useContext(LanguageContext);
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
          if (res.data.length === 0 && publishedWorks.length > 0) {
            message.warn(languagePackage?.NoMoreDatas);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchPublishedWorksBeforeArchorDate();
  }, [archorDate]);
  return (
    <Box width="60%" padding="1vw" maxHeight="80vh" overflow="auto">
      <PublishedWorkList publishedWorks={publishedWorks} />
      <Box marginLeft="30%">
        {Array.isArray(publishedWorks) && publishedWorks.length > 0 && (
          <Button variant="contained" onClick={handleClickLoadMore}>
            {languagePackage?.LoadMore}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Exhibition;
