import s from './index.module.scss'

interface Props {
  style?: any;
  children: React.ReactNode;
}

export default function Header1(props: Props) {
  return <h1 className={s.root} style={props.style}>{props.children}</h1>;
}
