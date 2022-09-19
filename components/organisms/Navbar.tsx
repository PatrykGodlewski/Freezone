import React, { useState } from 'react';
import Logo from '@components/atoms/Logo';
import MobileMenuButton from '@components/atoms/MobileMenuButton';
import SwitchDarkMode from '@components/atoms/Switch/SwitchDarkMode';
import Button from '@components/atoms/Button/Button';
import SearchBar from '@components/atoms/SearchBar/SearchBar';
import { IoSettingsSharp } from 'react-icons/io5';
import Link from 'next/link';
import MobileMenu from '@components/molecules/MobileMenu';

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleMobileMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMobileMenu((prev) => !prev);
  };

  return (
    <nav
      className={`bg-transparent border-gray-200 px-2 sm:px-4 py-8 sticky top-0 z-50 transition dark:bg-gray-900 dark:bg-opacity-90 bg-white bg-opacity-90 backdrop-blur-md`}
    >
      <div className="container flex justify-between items-center mx-auto md:flex-wrap flex-nowrap">
        <div className=" flex gap-4">
          <Logo />
          <SearchBar />
        </div>

        <div className="flex gap-4 relative">
          <Button className="px-4 hidden lg:block" type="full">
            <Link href={'/allgames'}>All games</Link>
          </Button>
          <Button className="px-4 hidden lg:block" type="outline">
            Check out our subscription plan
          </Button>
          <SwitchDarkMode className="hidden md:flex" />

          <Button
            className={`w-11 h-11 justify-center items-center hidden md:flex`}
            type="full"
          >
            <IoSettingsSharp size={'20px'} />
          </Button>
          <MobileMenuButton onClick={handleMobileMenu} />
          {mobileMenu && <MobileMenu />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
