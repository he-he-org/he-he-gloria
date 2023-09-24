import s from './index.module.scss'

interface Props {
  children: string;
}

export default function Header1(props: Props) {
  return <h1 className={s.root}>{props.children}</h1>;
}
