import React from 'react';

interface Props {
  color?: string;
  fontSize?: string;
  name: string;
  [key: string]: unknown;
}

const Iconfont: React.FC<Props> = ({ name, color, fontSize, ...rest }: Props) => {
  return (
    <i className={`iconfont ${name}`} {...rest} style={{ color, fontSize, cursor: 'pointer', borderRadius: '50%' }}></i>
  );
};

export default Iconfont;
