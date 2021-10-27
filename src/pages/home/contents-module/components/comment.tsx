import { CardHeader, CardContent, Card, Typography, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

import useUser from 'hooks/useUser';
import { getCountryData } from 'interface';
import { LanguageContext } from 'language';
import { FC, useContext } from 'react';
import { Comment as IComment } from 'requests/requests';
import { PublishedWorksContext } from '../contexts';
import classes from './classes.module.css';
interface Props {
  comment: IComment;
  handleDeleteComment: (commentID: string) => void;
}
const Comment: FC<Props> = ({ comment, handleDeleteComment }: Props) => {
  if (!comment._id) return <></>;
  const { commentable } = useContext(PublishedWorksContext);
  const { languagePackage } = useContext(LanguageContext);
  const user = useUser();
  const countryData = getCountryData(comment.publisher.country);
  const cardHeaderActionComponent = (commentable && user && user.userName === comment.publisher.userName && (
    <IconButton aria-label="settings" onClick={() => handleDeleteComment(comment._id)}>
      <DeleteIcon />
    </IconButton>
  )) || <></>;
  return (
    <Card className={classes.comment}>
      <CardHeader
        className={classes.commentHeader}
        avatar={<img src={comment.publisher.avatarUrl} className={classes.avatar} />}
        title={<strong>{comment.publisher.userName}</strong>}
        action={cardHeaderActionComponent}
        subheader={<img src={countryData?.nationalFlag} className={classes.nationalFlag} />}
      />
      <CardContent>
        <Typography variant="body1" component="p">
          {comment.content}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="caption" color="textSecondary" component="p">
          {languagePackage?.CommentAt}
          {new Date(comment.createdTime).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Comment;
