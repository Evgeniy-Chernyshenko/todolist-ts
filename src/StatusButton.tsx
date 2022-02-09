import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type defaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type StatusButtonPropsType = defaultButtonPropsType & { isActive: boolean };

export const StatusButton = ({ isActive, ...props }: StatusButtonPropsType) => {
  return <button className={isActive ? "activeFilter" : ""} {...props} />;
};
