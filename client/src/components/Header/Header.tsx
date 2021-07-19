import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="w-full flex justify-between">
      <div>
        <Link to="/">
          <h1 className="text-xl font-bold text-cyan-500">Nest Wordbook</h1>
        </Link>
      </div>
      <div>Profile</div>
    </div>
  );
};

export default Header;
