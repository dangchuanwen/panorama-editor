import { Box } from '@material-ui/core';
import { message } from 'antd';
import { LanguageContext } from 'language';
import React, { useContext } from 'react';
import { addComment, deleteComment, getPublishedWorksOfGroupMembers, PublishedWork } from 'requests/requests';
import { SettingsContext } from 'settings';

import PublishedWorkList from '../components/publishedWork.list';
import CultureThemesSelecter from './components/CultureThemesSelecter';
import GroupMembers from './components/GroupMembers';
interface IFriendsContext {
  commentable: boolean;
  handleComment?: (commentContent: string, commentedPublishedWorkID: string) => Promise<void>;
  handleDeleteComment?: (commentID: string) => Promise<void>;
}
export const friendsContext = React.createContext<IFriendsContext>({ commentable: false });

const Friends: React.FC = () => {
  const settings = useContext(SettingsContext);
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
      {settings?.grouped && <GroupMembers />}
      {!settings?.grouped && <CultureThemesSelecter />}

      <Box width="60%" padding="1vw">
        <friendsContext.Provider value={{ commentable: true, handleComment, handleDeleteComment }}>
          <PublishedWorkList showEmpty={settings?.grouped} publishedWorks={publishedWorksOfGroupMembers} />
        </friendsContext.Provider>
      </Box>
    </Box>
  );
};

export default Friends;
