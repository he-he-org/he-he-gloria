import s from "./index.module.scss";
import React from "react";

interface Props {
  children: React.ReactNode[];
  columnTemplate?: string;
  gap?: number;
  mobileReverse?: boolean;
}

export default function SideBySideBlock(props: Props) {
  const { children, columnTemplate, gap, mobileReverse } = props;

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
