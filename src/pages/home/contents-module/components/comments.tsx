import { Box } from '@material-ui/core';
import { FC } from 'react';
import { Comment as IComment } from 'requests/requests';
import Comment from './comment';
interface Props {
  comments: IComment[];
}
const Comments: FC<Props> = ({ comments }: Props) => {
  const commentsDatas = comments.filter((comment) => Boolean(comment._id));
  const renderComments = () => {
    return commentsDatas.map((comment) => <Comment comment={comment} key={comment._id} />);
  };
  return (
    <Box>
      <h3>
        <strong>评论</strong>
      </h3>
      <Box>{renderComments()}</Box>
      {commentsDatas.length === 0 && <p style={{ color: 'gray' }}>暂无评论</p>}
    </Box>
  );
};

export default Comments;
