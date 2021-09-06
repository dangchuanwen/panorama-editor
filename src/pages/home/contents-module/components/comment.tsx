import { CardHeader, CardContent, Card, Typography, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

import useUser from 'hooks/useUser';
import { Gender, getCountryData } from 'interface';
import { FC, useContext } from 'react';
import { Comment as IComment } from 'requests/requests';
import { friendsContext } from '../friends/index';
import classes from './classes.module.css';
interface Props {
  comment: IComment;
}
const Comment: FC<Props> = ({ comment }: Props) => {
  if (!comment._id) return <></>;
  const { handleDeleteComment, commentable } = useContext(friendsContext);

  const user = useUser();
  const avatar =
    comment.publisher.gender === Gender.Female ? 'http://icetnnu.ltd/female.png' : 'http://icetnnu.ltd/male.png';
  const countryData = getCountryData(comment.publisher.country);
  const cardHeaderActionComponent = (commentable && user && user.userName === comment.publisher.userName && (
    <IconButton aria-label="settings" onClick={() => handleDeleteComment && handleDeleteComment(comment._id)}>
      <DeleteIcon />
    </IconButton>
  )) || <></>;
  return (
    <Card className={classes.comment}>
      <CardHeader
        className={classes.commentHeader}
        avatar={<img src={avatar} className={classes.avatar} />}
        title={<strong>{comment.publisher.userName}</strong>}
        action={cardHeaderActionComponent}
        subheader={<img src={countryData?.nationalFlag} className={classes.nationalFlag} />}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {comment.content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Comment;
