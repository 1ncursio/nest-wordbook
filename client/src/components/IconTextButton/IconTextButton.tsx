import React from 'react';
import Icon, { IconType } from '../Icon/Icon';

export type IconButtonProps = {
  icon: IconType;
  text?: string;
  onClick(): void;
  className?: string;
};

const IconButton = ({
  icon,
  text,
  onClick,
  className = '',
}: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border-2 border-gray-200 shadow-md ${className}`}
    >
      <Icon name={icon} className="w-12 h-12 " />
      {text}
    </button>
  );
};

export default IconButton;
