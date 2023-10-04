"use client";
import s from "./index.module.scss";
import React from "react";
import { useIsMobile } from "../../helpers/browser";

interface Props {
  children: React.ReactNode[];
  columnTemplate?: string;
  gap?: number;
  mobileReverse?: boolean;
}

export default function SideBySideBlock(props: Props) {
  const { children, columnTemplate, gap, mobileReverse } = props;

  const isMobile = useIsMobile();

  return (
    <div
      className={[s.root, mobileReverse && s.mobileReverse].join(" ")}
      style={{
        gridTemplateColumns: columnTemplate,
        gap,
      }}
    >
      {children}
    </div>
  );
}
