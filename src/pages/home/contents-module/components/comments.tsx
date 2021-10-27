import { Box } from '@material-ui/core';
import { Modal } from 'antd';
import { LanguageContext } from 'language';
import { FC, useContext } from 'react';
import { Comment as IComment } from 'requests/requests';
import Comment from './comment';
interface Props {
  comments: IComment[];
  handleDeleteComment: (commentID: string) => void;
}
const Comments: FC<Props> = ({ comments, handleDeleteComment }: Props) => {
  const { languagePackage } = useContext(LanguageContext);
  const commentsDatas = comments.filter((comment) => Boolean(comment._id));
  const renderComments = () => {
    return commentsDatas.map((comment) => (
      <Comment
        handleDeleteComment={(commentID: string) => {
          Modal.confirm({
            title: languagePackage?.DoYouWantToDelete,
            onOk: () => handleDeleteComment(commentID),
          });
        }}
        comment={comment}
        key={comment._id}
      />
    ));
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
