import React from 'react';

interface Props {
  color?: string;
  fontSize?: string;
  name: string;
  className?: string;
  [key: string]: unknown;
}

const Iconfont: React.FC<Props> = ({ className = '', name, color, fontSize, ...rest }: Props) => {
  return (
    <i
      className={`iconfont ${name} ` + className}
      {...rest}
      style={{ color, fontSize, cursor: 'pointer', borderRadius: '50%' }}
    ></i>
  );
};

export default Iconfont;
