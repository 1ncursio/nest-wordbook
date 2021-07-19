import React, { useEffect } from 'react';
import useRefresh from '../../hooks/useRefresh';

const Refresh = () => {
  const refresh = useRefresh();

  useEffect(() => {
    refresh();
  }, []);

  return <div>Refreshing...</div>;
};

export default Refresh;
