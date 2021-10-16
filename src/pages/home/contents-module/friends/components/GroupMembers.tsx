import { Box, Typography } from '@material-ui/core';
import { LanguageContext } from 'language';
import { FC, useContext, useEffect, useState } from 'react';
import { getGroupMembers, User } from 'requests/requests';
import ProfileCard from './ProfileCard';
import classes from './style.module.css';
const GroupMembers: FC = () => {
  const { languagePackage } = useContext(LanguageContext);
  const [members, setMembers] = useState<User[]>([]);
  useEffect(() => {
    const fetchGroupMembers = async () => {
      const res = await getGroupMembers();
      const data: User[] = res.data;
      setMembers(data);
    };
    fetchGroupMembers();
  }, []);
  const renderMembers = () => {
    return members.map((member) => {
      return <ProfileCard key={member.userName} profile={member} />;
    });
  };
  return (
    <Box marginBottom="10px">
      <Typography variant="h5" component="div" gutterBottom>
        {languagePackage?.GroupMembers}
      </Typography>
      <Box className={classes.members}>{renderMembers()}</Box>
    </Box>
  );
};

export default GroupMembers;
