import React from "react";
import s from "./index.module.scss";
import Header from "../Header";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function MessagePage(props: Props) {
  const { title, children } = props;
  return (
    <div className={s.root}>
      <Header />
      <div className={s.content}>
        <h1 className={s.title}>{title}</h1>
        <div>{children}</div>
      </div>
    </div>
  );
}
