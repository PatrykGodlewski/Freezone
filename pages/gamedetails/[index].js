import React from 'react';
import { useRouter } from 'next/router';

const Index = () => {
  const { query } = useRouter();
  return <div>{query.index}</div>;
};

export default Index;
