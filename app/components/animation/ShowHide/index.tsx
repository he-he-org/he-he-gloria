"use client";
import React from "react";

interface Props {
  isVisible: boolean;
  animationTime: number;
  children: (htmlProps: { style: Record<string, unknown> }) => React.ReactNode;
}

export default function ShowHide(props: Props) {
  const { isVisible = false, animationTime, children } = props;
  return (
    <>
      {children({
        style: {
          opacity: isVisible ? 1 : 0,
          transitionDuration: `${animationTime ?? 500}ms`,
          transitionProperty: "opacity",
        },
      })}
    </>
  );
}
