import { Box, Card, CardActions } from '@material-ui/core';
import { ChangeEvent, FC, useContext, useState } from 'react';
import { Input } from 'antd';
import { LanguageContext } from 'language';

interface Props {
  handleAddComment: (content: string) => void;
}

const AddComment: FC<Props> = ({ handleAddComment }: Props) => {
  const { languagePackage } = useContext(LanguageContext);
  const [comment, setComment] = useState<string>('');
  return (
    <Card>
      <CardActions>
        <Box width="60%">
          <Input.Search
            value={comment}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}
            onSearch={(content) => {
              handleAddComment(content);
              setComment('');
            }}
            placeholder={languagePackage?.CommentHere}
            enterButton={languagePackage?.Publish}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default AddComment;
