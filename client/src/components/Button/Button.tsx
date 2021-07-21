import React, { ButtonHTMLAttributes } from 'react';

export type ButtonProps = {
  text: string;
};

const Button = ({
  text,
  ...props
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...props}>{text}</button>;
};

export default Button;
