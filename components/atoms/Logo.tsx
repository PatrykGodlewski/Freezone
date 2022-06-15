import React from 'react';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center ">
      <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white cursor-pointer">
        Freezone
      </span>
    </Link>
  );
};

export default Logo;
