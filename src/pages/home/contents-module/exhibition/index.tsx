import { Box, Button } from '@material-ui/core';
import { message } from 'antd';
import { LanguageContext } from 'language';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { FC } from 'react';
import { addComment, deleteComment, getPublishedWorksBeforeArchorDate, PublishedWork } from 'requests/requests';
import PublishedWorkList from '../components/publishedWork.list';
import ClassificationTags from './components/ClassificationTags';
import { PublishedWorksContext } from '../contexts';
const Exhibition: FC = () => {
  const { languagePackage } = useContext(LanguageContext);
  const [load, setLoad] = useState<number>(0);

  const [selectedCultureThemesNames, setSelectedCultureThemesNames] = useState<string[]>([]);
  const handleClickCultureThemeTag: (s: string[]) => void = (cultureThemesNames: string[]) => {
    setSelectedCultureThemesNames(cultureThemesNames);
  };

  const [publishedWorks, setPublishedWorks] = useState<PublishedWork[]>([]);
  const handleClickLoadMore = async () => {
    const earliestPublishedWork = publishedWorks[publishedWorks.length - 1];
    if (earliestPublishedWork) {
      try {
        const res = await getPublishedWorksBeforeArchorDate(
          new Date(earliestPublishedWork.createdTime),
          selectedCultureThemesNames,
        );
        if (res && res.data) {
          if (res.data.length === 0 && publishedWorks.length > 0) {
            message.warn(languagePackage?.NoMoreDatas);
          } else {
            setPublishedWorks([...publishedWorks, ...res.data]);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    const fetchPublishedWorksBeforeArchorDate = async () => {
      try {
        const res = await getPublishedWorksBeforeArchorDate(new Date(), selectedCultureThemesNames);
        if (res && res.data) {
          const newPublishedWorks = res.data;
          setPublishedWorks(newPublishedWorks);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchPublishedWorksBeforeArchorDate();
  }, [selectedCultureThemesNames]);

  const handleComment = async (commentContent: string, commentedPublishedWorkID: string) => {
    try {
      await addComment(commentContent, commentedPublishedWorkID);
      message.success(languagePackage?.SuccessToComment);
      setLoad(load + 1);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteComment = async (commentID: string) => {
    try {
      await deleteComment(commentID);
      message.success(languagePackage?.SuccessToRemove);
      setLoad(load + 1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box width="60%" padding="1vw" maxHeight="80vh" overflow="auto">
      <Box marginBottom="20px">
        <ClassificationTags handleClickCultureThemeTag={handleClickCultureThemeTag} />
      </Box>
      <PublishedWorksContext.Provider
        value={{
          publishedWorks: publishedWorks,
          commentable: true,
          showEmpty: true,
          handleComment,
          handleDeleteComment,
        }}
      >
        <PublishedWorkList />
      </PublishedWorksContext.Provider>

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
