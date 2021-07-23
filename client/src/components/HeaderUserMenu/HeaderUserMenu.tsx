import React, { useCallback } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link } from 'react-router-dom';

type HeaderUserMenuProps = {
  onClose: (e: React.MouseEvent) => void;
  visible: boolean;
};

const HeaderUserMenu = ({ onClose, visible }: HeaderUserMenuProps) => {
  if (!visible) return null;

  return (
    <OutsideClickHandler onOutsideClick={onClose}>
      <div onClick={onClose}>
        <div>
          <Link to="/account/profile">Profile</Link>
        </div>
        <div>메뉴 2</div>
        <div>메뉴 3</div>
        <div>메뉴 4</div>
      </div>
    </OutsideClickHandler>
  );
};

export default HeaderUserMenu;
