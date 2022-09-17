import React from 'react';
import { BiSearch } from 'react-icons/bi';

const input = () => {
  return (
    <form className="relative w-full max-w-md hidden sm:block">
      <input
        type="text"
        placeholder="Search"
        className="w-full border-2 border-gray-800 dark:border-gray-50 p-2 px-4 bg-transparent rounded focus:ring"
        required
      />
      <button type="submit" className="absolute right-4 top-0 bottom-0">
        <BiSearch size={'18px'} />
      </button>
    </form>
  );
};

export default input;
