import { Avatar, Box, Tooltip, Typography } from '@material-ui/core';
import { message, Tag } from 'antd';
import Iconfont from 'components/Iconfont';
import { CountryData, getCountryData } from 'interface';
import { FC, useContext, useState, useEffect } from 'react';
import {
  addComment,
  getCommentsOfPublishedWork,
  PublishedWork,
  Comment as IComment,
  deleteComment,
} from 'requests/requests';
import classes from './classes.module.css';
import { getLanguageFromLocalStorage, LanguageContext, LanguageNames } from 'language';
import AddComment from './addComment';
import { PublishedWorksContext } from '../contexts';
import Comments from './comments';
interface Props {
  publishedWork: PublishedWork;
}
const PublishedWorkItem: FC<Props> = ({ publishedWork }: Props) => {
  const { languagePackage } = useContext(LanguageContext);
  const { author, work, introduction, createdTime } = publishedWork;
  const [comments, setComments] = useState<IComment[]>([]);
  const { commentable } = useContext(PublishedWorksContext);
  const languageName: LanguageNames = getLanguageFromLocalStorage();
  const countryData: CountryData | undefined = getCountryData(author.country);
  const countryName: string =
    (countryData && (languageName === LanguageNames.cn ? countryData.cnText : countryData?.enText)) || '';

  const firstScene = work.panoramaTourConfig.default.firstScene;
  const workPoster =
    work.panoramaTourConfig.scenes[firstScene].panorama ||
    'http://icetnnu.ltd/u%3D861387783%2C2279533978%26fm%3D26%26fmt%3Dauto%26gp%3D0.webp';

  const handleAddComment = async (content: string) => {
    await addComment(content, publishedWork._id);
    message.success(languagePackage?.SuccessToComment);
    setLoad(load + 1);
  };

  const handleRemoveComment = async (commentID: string) => {
    await deleteComment(commentID);
    message.success(languagePackage?.SuccessToRemove);
    setLoad(load + 1);
  };

  const [load, setLoad] = useState<number>(0);
  useEffect(() => {
    const fetchComments = async () => {
      const res = await getCommentsOfPublishedWork(publishedWork._id);
      const data: IComment[] = res.data;
      setComments(data);
    };
    fetchComments();
  }, [load]);

  const handleClickPlay = () => {
    window.open(`/play/${work._id}`);
  };
  return (
    <Box width="100%" marginBottom="2vh" padding="10px" borderRadius="5px" boxShadow="0 0 6px gray">
      <Box width="100%" display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Avatar alt="female avatar" src={author.avatarUrl} />
          <Box marginLeft="0.5vw">
            <p style={{ fontWeight: 'bold', margin: '0' }}>{author.userName}</p>
            <p style={{ margin: '0' }}>
              <span style={{ color: 'gray', marginRight: '0.3vw' }}>{countryName}</span>
              <img style={{ width: '1.2vw' }} src={countryData?.nationalFlag} alt={countryData?.text} />
            </p>
          </Box>
        </Box>
        <Box>{publishedWork.work.workTheme && <Tag color="#2db7f5">{publishedWork.work.workTheme.name}</Tag>}</Box>
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
      <Box paddingTop="10px">
        <Typography variant="caption" color="textSecondary" component="p">
          {languagePackage?.PublishAt}
          {new Date(createdTime).toLocaleDateString()}
        </Typography>
      </Box>
      <Box marginTop="2vh">
        <Comments handleDeleteComment={handleRemoveComment} comments={comments || []} />
        {commentable && <AddComment handleAddComment={handleAddComment} />}
      </Box>
    </Box>
  );
};
export default PublishedWorkItem;
