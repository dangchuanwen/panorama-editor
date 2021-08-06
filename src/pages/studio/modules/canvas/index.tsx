import React from 'react';
import { Box } from '@material-ui/core';
interface Props {
  onMouseup: (p: unknown, e: Event) => void;
}
const Canvas: React.FC<Props> = ({ onMouseup }: Props) => {
  React.useEffect(() => {
    const p = window.pannellum.viewer('panorama', {
      default: {
        firstScene: 'passage',
        sceneFadeDuration: 1000,
      },
      scenes: {
        passage: {
          type: 'equirectangular',
          panorama: 'http://icetnnu.ltd/1.jpg',
        },
      },
    });
    p.on('mouseup', (e: Event) => {
      onMouseup(p, e);
    });
  }, []);

  return <Box height="100%" width="100%" id="panorama"></Box>;
};

export default Canvas;
