import React from 'react';
import Logo from '@components/atoms/Logo';
import MobileMenuButton from '@components/atoms/MobileMenuButton';
import SwitchDarkMode from '@components/atoms/Switch/SwitchDarkMode';
import Button from '@components/atoms/Button/Button';
import SearchBar from '@components/atoms/SearchBar/SearchBar';
import { IoSettingsSharp } from 'react-icons/io5';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav
      className={`bg-transparent border-gray-200 px-2 sm:px-4 py-8 sticky top-0 z-50 transition dark:bg-gray-900 bg-white bg-opacity-80 backdrop-blur-md`}
    >
      <div className="container flex justify-between items-center mx-auto flex-wrap">
        <div className=" flex gap-4">
          <Logo />
          <SearchBar />
        </div>

        <div className="flex gap-4">
          <Button className="px-4" type="full">
            <Link href={'/allgames'}>All games</Link>
          </Button>
          <Button className="px-4" type="outline">
            Check out our subscription plan
          </Button>
          <SwitchDarkMode />

          <Button
            className={`w-11 h-11 flex justify-center items-center`}
            type="full"
          >
            <IoSettingsSharp size={'20px'} />
          </Button>
          <MobileMenuButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
