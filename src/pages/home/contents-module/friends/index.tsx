import { Box, Typography } from '@material-ui/core';
import { message } from 'antd';
import useUser from 'hooks/useUser';
import { LanguageContext } from 'language';
import React, { useContext } from 'react';
import { addComment, deleteComment, getPublishedWorksOfGroupMembers, PublishedWork } from 'requests/requests';
import { SettingsContext } from 'settings';

import PublishedWorkList from '../components/publishedWork.list';
import CultureThemesSelecter from './components/CultureThemesSelecter';
import GroupMembers from './components/GroupMembers';
import { PublishedWorksContext } from '../contexts';

const Friends: React.FC = () => {
  const settings = useContext(SettingsContext);
  const user = useUser();
  const { languagePackage } = useContext(LanguageContext);
  const [loadData, setLoadData] = React.useState<number>(0);
  const [publishedWorksOfGroupMembers, setPublishedWorksOfGroupMembers] = React.useState<PublishedWork[]>([]);
  const handleComment = async (commentContent: string, commentedPublishedWorkID: string) => {
    try {
      await addComment(commentContent, commentedPublishedWorkID);
      message.success(languagePackage?.SuccessToComment);
      setLoadData(loadData + 1);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      message.error(err.response?.data.message);
    }
  };
  const handleDeleteComment = async (commentID: string) => {
    try {
      await deleteComment(commentID);
      message.success(languagePackage?.SuccessToRemove);
      setLoadData(loadData + 1);
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    const fetchPublishedWorksOfGroupMembers = async () => {
      try {
        const res = await getPublishedWorksOfGroupMembers();
        if (res && res.data) {
          setPublishedWorksOfGroupMembers(res.data);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        message.error(err.response?.data.message);
      }
    };
    fetchPublishedWorksOfGroupMembers();
  }, [loadData]);
  return (
    <Box width="100%" maxHeight="80vh" overflow="auto">
      {settings?.grouped && user && user.group && (
        <Typography variant="h5" component="div" gutterBottom>
          {languagePackage?.GroupName}: {user && user.group}
        </Typography>
      )}
      {settings?.grouped && user && user.group && <GroupMembers />}
      {!settings?.grouped && <CultureThemesSelecter />}

      {settings?.grouped && (
        <Box width="60%" padding="1vw">
          <PublishedWorksContext.Provider
            value={{
              showEmpty: settings?.grouped,
              commentable: true,
              publishedWorks: publishedWorksOfGroupMembers,
              handleComment,
              handleDeleteComment,
            }}
          >
            <PublishedWorkList />
          </PublishedWorksContext.Provider>
        </Box>
      )}
    </Box>
  );
};

export default Friends;
