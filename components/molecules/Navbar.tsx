import Logo from '@components/atoms/Logo';
import MobileMenuButton from '@components/atoms/MobileMenuButton';
import React from 'react';
import Link from 'next/link';
import SwitchDarkMode from '@components/atoms/Switch/SwitchDarkMode';
import Button from '@components/atoms/Button/Button';

const Navbar = () => {
  return (
    <nav className="bg-transparent border-gray-200 px-2 sm:px-4 py-8  ">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Logo />
        <div className="flex gap-4">
          <Button type="outline">Check out our subscription plan</Button>

          <SwitchDarkMode />
        </div>

        <MobileMenuButton />
      </div>
    </nav>
  );
};

export default Navbar;
