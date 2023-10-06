import s from "./index.module.scss";
import React from "react";

type Props = {
  type: "SUCCESS" | "ERROR";
  children: React.ReactNode;
};
export default function Message(props: Props) {
  return (
    <p className={[s.root, s[`type-${props.type}`]].join(" ")}>
      {props.children}
    </p>
  );
}
