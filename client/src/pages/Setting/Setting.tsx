import React, { useEffect } from 'react';
import useSWR from 'swr';
import fetcher from '../../lib/api/fetcher';

const Setting = () => {
  const { data } = useSWR('/auth/profile', fetcher);
  useEffect(() => {
    if (data) console.log({ data });
  }, [data]);

  return <div>account</div>;
};

export default Setting;
