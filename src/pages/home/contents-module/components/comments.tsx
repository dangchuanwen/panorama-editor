import { Box } from '@material-ui/core';
import { LanguageContext } from 'language';
import { FC, useContext } from 'react';
import { Comment as IComment } from 'requests/requests';
import Comment from './comment';
interface Props {
  comments: IComment[];
}
const Comments: FC<Props> = ({ comments }: Props) => {
  const { languagePackage } = useContext(LanguageContext);
  const commentsDatas = comments.filter((comment) => Boolean(comment._id));
  const renderComments = () => {
    return commentsDatas.map((comment) => <Comment comment={comment} key={comment._id} />);
  };
  return (
    <Box>
      <h3>
        <strong>{languagePackage?.Comments}</strong>
      </h3>
      <Box>{renderComments()}</Box>
      {commentsDatas.length === 0 && <p style={{ color: 'gray' }}>{languagePackage?.NoComments}</p>}
    </Box>
  );
};

export default Comments;
