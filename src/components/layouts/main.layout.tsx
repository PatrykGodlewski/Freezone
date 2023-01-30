import Footer from '@components/organisms/Footer';
import Navbar from '@components/organisms/Navbar';
import Head from 'next/head';
import React from 'react';

type PropTypes = {
  children: React.ReactNode;
};

export default function Layout({ children }: PropTypes) {
  return (
    <>
      <Head>
        <title>Freezone</title>
        <meta
          name="description"
          content="Freezone - free place for free games"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="container mx-auto">{children}</main>
      <Footer />
    </>
  );
}
