import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import useProfileSWR from '../../hooks/swr/useProfileSWR';
import useToggle from '../../hooks/useToggle';
import HeaderUserIcon from '../HeaderUserIcon';
import HeaderUserMenu from '../HeaderUserMenu';

const Header = () => {
  const [userMenu, toggleUserMenu] = useToggle(false);
  const headerUserIconRef = useRef<HTMLDivElement>(null);

  const { data: userData, isLoading: isLoadingUserData } = useProfileSWR();

  const onOutsideClick = useCallback(
    (e: React.MouseEvent) => {
      if (!headerUserIconRef.current) return;
      if (headerUserIconRef.current.contains(e.target as any)) return;
      toggleUserMenu();
    },
    [toggleUserMenu],
  );

  return (
    <div className="w-full flex justify-between items-center">
      <div>
        <Link to="/">
          <h1 className="text-xl font-bold text-white">Nest Wordbook</h1>
        </Link>
      </div>
      {userData && (
        <div>
          <div ref={headerUserIconRef}>
            <HeaderUserIcon onClick={toggleUserMenu} />
          </div>
          <HeaderUserMenu visible={userMenu} onClose={onOutsideClick} />
        </div>
      )}
      {!(userData && isLoadingUserData) && <div>로그인</div>}
      {/* 로그인 모달 */}
    </div>
  );
};

export default Header;
