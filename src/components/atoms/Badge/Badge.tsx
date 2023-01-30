import React from 'react';

type PropTypes = {
  text: string;
  type: 'white' | 'black' | 'outlined-white' | 'outlined-black';
};

const styles =
  'p-2 px-4 rounded uppercase font-bold max-w-min whitespace-nowrap';

const span = ({ text, type }: PropTypes) => {
  if (type === 'white') {
    return <div className={`${styles} text-gray-900  bg-gray-50`}>{text}</div>;
  }

  if (type === 'black') {
    return <div className={`${styles} text-gray-50 bg-gray-900 `}>{text}</div>;
  }

  return (
    <div className={`${styles} border dark:border-gray-50 border-gray-900 `}>
      {text}
    </div>
  );
};

export default span;
