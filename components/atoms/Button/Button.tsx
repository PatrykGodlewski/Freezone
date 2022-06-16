import React from 'react';

type PropsType = {
  children: string;
  type: 'outline' | 'full';
};

const Button = ({ children, type }: PropsType) => {
  return (
    <>
      {type === 'full' && (
        <button
          tabIndex={-1}
          className="bg-gray-800 text-gray-50 dark:bg-gray-200 dark:text-gray-800 p-4 font-medium rounded-full transition-all hover:ring-2 ring-offset-4 dark:ring-offset-gray-900  ring-offset-gray-50 dark:ring-gray-200 ring-gray-800"
        >
          {children}
        </button>
      )}
      {type === 'outline' && (
        <button className="border-2 border-gray-800 dark:border-gray-200 p-4 font-medium rounded-full transition-all hover:ring-2 ring-offset-4 dark:ring-offset-gray-900  ring-offset-gray-50 dark:ring-gray-200 ring-gray-800 focus:focus-visible:outline focus:focus-visible:outline-2 focus:focus-visible:outline-gray-50 focus:focus-visible:outline-offset-4">
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
