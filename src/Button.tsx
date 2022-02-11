import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type defaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ButtonPropsType = defaultButtonPropsType & { isActive?: boolean };

export const Button = ({ isActive, className, ...props }: ButtonPropsType) => {
  const finalClassName = [className, isActive && "activeFilter"]
    .filter((c) => c)
    .join(" ");

  return <button className={finalClassName} {...props} />;
};
