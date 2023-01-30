import React from 'react';
import Link from 'next/link';

const Logo = () => {
  return (
    <div className="flex items-center">
      <Link
        href="/"
        className="self-center text-xl font-semibold whitespace-nowrap dark:text-white cursor-pointer transition hover:bg-gray-100 dark:hover:bg-gray-800 p-2 px-4 rounded focus:outline focus:outline-1 focus:ring focus-visible:outline focus-visible:outline-1 focus-visible:outline-gray-50 focus-visible:ring "
      >
        Freezone
      </Link>
    </div>
  );
};

export default Logo;
