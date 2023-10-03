import s from "./index.module.scss";
import React from "react";

interface Props {
  children: React.ReactNode;
  columnTemplate?: string;
  gap?: number;
}

export default function SideBySideBlock(props: Props) {
  const { children, columnTemplate, gap } = props;
  return (
    <div
      className={s.root}
      style={{ gridTemplateColumns: columnTemplate, gap: gap }}
    >
      {children}
    </div>
  );
}
