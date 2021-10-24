import { Box, Button } from '@material-ui/core';
import { message } from 'antd';
import { LanguageContext } from 'language';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { FC } from 'react';
import { getPublishedWorksBeforeArchorDate, PublishedWork } from 'requests/requests';
import PublishedWorkList from '../components/publishedWork.list';
import ClassificationTags from './components/ClassificationTags';

const Exhibition: FC = () => {
  const { languagePackage } = useContext(LanguageContext);
  const [archorDate, setArchorDate] = useState<Date>(new Date());

  const [selectedCultureThemesNames, setSelectedCultureThemesNames] = useState<string[]>([]);
  const handleClickCultureThemeTag: (s: string[]) => void = (cultureThemesNames: string[]) => {
    setSelectedCultureThemesNames(cultureThemesNames);
  };

  const [totalPublishedWorks, setTotalPublishedWorks] = useState<PublishedWork[]>([]);
  const handleClickLoadMore = () => {
    const earliestPublishedWork = totalPublishedWorks[totalPublishedWorks.length - 1];
    if (earliestPublishedWork) {
      setArchorDate(earliestPublishedWork.createdTime);
    }
  };
  useEffect(() => {
    const fetchPublishedWorksBeforeArchorDate = async () => {
      try {
        const res = await getPublishedWorksBeforeArchorDate(archorDate);
        if (res && res.data) {
          const newPublishedWorks = [...totalPublishedWorks, ...res.data];
          setTotalPublishedWorks(newPublishedWorks);
          if (res.data.length === 0 && totalPublishedWorks.length > 0) {
            message.warn(languagePackage?.NoMoreDatas);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchPublishedWorksBeforeArchorDate();
  }, [archorDate]);

  const [selectedPublishedWorks, setSelectedPublishedWorks] = useState<PublishedWork[]>([]);
  useEffect(() => {
    if (selectedCultureThemesNames.length === 0) {
      setSelectedPublishedWorks(totalPublishedWorks);
    } else {
      setSelectedPublishedWorks(
        totalPublishedWorks.filter((item) => {
          return selectedCultureThemesNames.includes(item.work.workTheme.name);
        }),
      );
    }
  }, [selectedCultureThemesNames, totalPublishedWorks]);

  return (
    <Box width="60%" padding="1vw" maxHeight="80vh" overflow="auto">
      <Box marginBottom="20px">
        <ClassificationTags handleClickCultureThemeTag={handleClickCultureThemeTag} />
      </Box>
      <PublishedWorkList publishedWorks={selectedPublishedWorks} />
      <Box marginLeft="30%">
        {Array.isArray(selectedPublishedWorks) && selectedPublishedWorks.length > 0 && (
          <Button variant="contained" onClick={handleClickLoadMore}>
            {languagePackage?.LoadMore}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Exhibition;
