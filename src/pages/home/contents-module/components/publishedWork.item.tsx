import { Avatar, Box, Tooltip, Card, CardActions } from '@material-ui/core';
import { Input } from 'antd';
import Iconfont from 'components/Iconfont';
import { getAvatorOfGender, getCountryData } from 'interface';
import { FC, useContext } from 'react';
import { PublishedWork } from 'requests/requests';
import classes from './classes.module.css';
import Comments from './comments';
import { friendsContext } from '../friends/index';
import { LanguageContext } from 'language';
interface Props {
  publishedWork: PublishedWork;
}
const PublishedWorkItem: FC<Props> = ({ publishedWork }: Props) => {
  const { languagePackage } = useContext(LanguageContext);
  const { commentable, handleComment } = useContext(friendsContext);
  const { author, work, introduction, comments } = publishedWork;

  const firstScene = work.panoramaTourConfig.default.firstScene;
  const workPoster =
    work.panoramaTourConfig.scenes[firstScene].panorama ||
    'http://icetnnu.ltd/u%3D861387783%2C2279533978%26fm%3D26%26fmt%3Dauto%26gp%3D0.webp';
  const userCountryData = getCountryData(author.country);
  const avatorOfGender = getAvatorOfGender(author.gender);
  const handleClickPlay = () => {
    window.open(`/play/${work._id}`);
  };
  return (
    <Box width="100%" marginBottom="2vh" padding="10px" borderRadius="5px" boxShadow="0 0 6px gray">
      <Box display="flex" alignItems="center">
        <Avatar alt="female avatar" src={avatorOfGender} />
        <Box marginLeft="0.5vw">
          <p style={{ fontWeight: 'bold', margin: '0' }}>{author.userName}</p>
          <p style={{ margin: '0' }}>
            <span style={{ color: 'gray', marginRight: '0.3vw' }}>{userCountryData?.text}</span>
            <img style={{ width: '1.2vw' }} src={userCountryData?.nationalFlag} alt={userCountryData?.text} />
          </p>
        </Box>
      </Box>
      <Box marginTop="1vh" fontSize="1vw" color="#333">
        <p>{introduction}</p>
      </Box>
      <Box marginTop="2vh" className={classes.imageWrapper} width="30%" position="relative">
        <Box position="absolute" className={classes.backDrop} width="100%" height="100%" bgcolor="rgba(0,0,0,0.7)">
          <Tooltip title={languagePackage?.Watch || ''} placement="top" arrow={true}>
            <Box onClick={handleClickPlay}>
              <Iconfont name="icon-70BasicIcons-all-64" color="#37daf6" fontSize="1.6vw" />
            </Box>
          </Tooltip>
        </Box>
        <img style={{ width: '100%', borderRadius: '5px' }} alt="panorama work" src={workPoster} />
      </Box>
      <Box marginTop="2vh">
        <Comments comments={comments || []} />
        {commentable && (
          <Card>
            <CardActions>
              <Box width="60%">
                <Input.Search
                  placeholder={languagePackage?.CommentHere}
                  onSearch={(content) => {
                    if (handleComment) {
                      handleComment(content, publishedWork._id);
                    }
                  }}
                  enterButton={languagePackage?.Publish}
                />
              </Box>
            </CardActions>
          </Card>
        )}
      </Box>
    </Box>
  );
};
export default PublishedWorkItem;
