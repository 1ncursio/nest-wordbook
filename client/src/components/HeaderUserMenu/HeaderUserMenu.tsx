import React, { useCallback } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link } from 'react-router-dom';
import useProfileSWR from '../../hooks/swr/useProfileSWR';
import useLogout from '../../hooks/useLogout';
import logout from '../../lib/api/auth/logout';
import HeaderUserMenuItem from '../HeaderUserMenuItem';

type HeaderUserMenuProps = {
  onClose: (e: React.MouseEvent) => void;
  visible: boolean;
};

const HeaderUserMenu = ({ onClose, visible }: HeaderUserMenuProps) => {
  const logout = useLogout();

  if (!visible) return null;

  return (
    <OutsideClickHandler onOutsideClick={onClose}>
      <div className="relative">
        <div
          onClick={onClose}
          className="absolute w-36 shadow right-0 top-3 rounded-md bg-gray-500 text-gray-600"
        >
          <HeaderUserMenuItem to="/account/profile">
            내 프로필
          </HeaderUserMenuItem>
          <HeaderUserMenuItem>메뉴 1</HeaderUserMenuItem>
          <HeaderUserMenuItem>메뉴 2</HeaderUserMenuItem>
          <HeaderUserMenuItem onClick={logout}>로그아웃</HeaderUserMenuItem>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default HeaderUserMenu;
