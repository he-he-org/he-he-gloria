"use client";
import s from "./index.module.scss";

interface Props {
  onClick: () => void;
}

export default function PayButton(props: Props) {
  return <button className={s.root} onClick={props.onClick}>Donate</button>;
}
