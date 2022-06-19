import React from 'react';

type PropTypes = {
  text: string;
  type: 'white' | 'black' | 'outlined-white' | 'outlined-black';
};

const styles = 'p-2 px-4 rounded uppercase font-bold';

const span = ({ text, type }: PropTypes) => {
  if (type === 'white') {
    return <div className={`${styles} bg-gray-50`}>{text}</div>;
  }

  if (type === 'black') {
    return (
      <div className={`p-2 px-4 rounded bg-gray-50 uppercase`}>{text}</div>
    );
  }
};

export default span;
