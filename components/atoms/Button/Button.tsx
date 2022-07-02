import React from 'react';

type PropsType = {
  children: string | React.ReactNode;
  type: 'outline' | 'full' | 'invertedFull';
  className?: string;
};

const Button = ({ children, type, className, href }: PropsType) => {
  return (
    <>
      {type === 'full' && (
        <button
          tabIndex={-1}
          className={`${className}  bg-gray-800 text-gray-50 dark:bg-gray-200 dark:text-gray-800 p-2 font-medium rounded transition-all hover:ring-2 ring-offset-4 dark:ring-offset-gray-900  ring-offset-gray-50 dark:ring-gray-200 ring-gray-800 `}
        >
          {children}
        </button>
      )}
      {type === 'outline' && (
        <button
          className={`${className}  border-2 border-gray-800 dark:border-gray-200 p-2 font-medium rounded transition-all hover:ring-2 ring-offset-4 dark:ring-offset-gray-900  ring-offset-gray-50 dark:ring-gray-200 ring-gray-800 focus:focus-visible:outline focus:focus-visible:outline-2 focus:focus-visible:outline-gray-50 focus:focus-visible:outline-offset-4`}
        >
          {children}
        </button>
      )}
      {type === 'invertedFull' && (
        <button
          tabIndex={-1}
          className={`${className}  bg-gray-800 text-gray-50 p-2 font-medium rounded transition-all hover:ring-2 ring-offset-4 dark:ring-offset-gray-900  ring-offset-gray-50 dark:ring-gray-200 ring-gray-800 `}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
