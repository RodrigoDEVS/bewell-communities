"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function IconButton(props: IconButtonProps) {
  const { children, ...rest } = props;
  return (
    <button
      className="text-gray-400 cursor-pointer hover:text-gray-600"
      {...rest}
    >
      {children}
    </button>
  );
}

export default IconButton;
