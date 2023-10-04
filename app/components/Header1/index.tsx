import s from "./index.module.scss";

interface Props {
  small?: boolean;
  style?: object;
  children: React.ReactNode;
}

export default function Header1(props: Props) {
  return (
    <h1
      className={[s.root, props.small && s.small].join(" ")}
      style={props.style}
    >
      {props.children}
    </h1>
  );
}
