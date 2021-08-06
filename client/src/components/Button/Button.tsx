import React, { ButtonHTMLAttributes, FC } from 'react';

export type ButtonProps = {
  text: string;
};

const Button: FC<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({
  text,
  ...props
}) => {
  return <button {...props}>{text}</button>;
};

export default Button;
