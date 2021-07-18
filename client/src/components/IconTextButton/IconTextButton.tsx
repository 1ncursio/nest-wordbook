import { css } from '@emotion/react';
import React from 'react';
import Icon, { IconType } from '../Icon/Icon';

export type IconTextButtonProps = {
  icon: IconType;
  text?: string;
  onClick(): void;
  className?: string;
};

const IconTextButton = ({
  icon,
  text,
  onClick,
  className,
}: IconTextButtonProps) => {
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

// const backgroundColor = css`
//   background-color: #c26273;
// `;

export default IconTextButton;
