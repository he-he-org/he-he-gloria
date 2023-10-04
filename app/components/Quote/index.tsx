import React from "react";
import s from "./index.module.scss";
import MarksSvg from "./marks.svg";

interface Props {
  color: "WHITE" | "BLACK";
  children: React.ReactNode;
}

export default function Quote(props: Props) {
  const { color } = props;
  return (
    <blockquote className={[s.root, s[`color-${color}`]].join(" ")}>
      <MarksSvg className={s.quoteIcon} />
      {props.children}
    </blockquote>
  );
}
