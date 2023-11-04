"use client";
import React from "react";
import { useIsMobile } from "../../helpers/browser";

interface Props {
  children: React.ReactNode;
  mobile: React.ReactNode;
}

export default function SwapIllustrations(props: Props) {
  const { children, mobile } = props;

  const isMobile = useIsMobile();
  return <>{isMobile ? mobile : children}</>;
}
