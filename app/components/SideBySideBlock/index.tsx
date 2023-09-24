import s from "./index.module.scss";
import React from "react";

interface Props {
  children: React.ReactNode;
  columnTemplate?: string;
}

export default function SideBySideBlock(props: Props) {
  const { children, columnTemplate } = props;
  return (
    <div className={s.root} style={{ gridTemplateColumns: columnTemplate }}>
      {children}
    </div>
  );
}
