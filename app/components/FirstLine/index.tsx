import s from './index.module.scss'

interface Props {
  children: string;
}

export default function Header2(props: Props) {
  return <h2 className={s.root}>{props.children}</h2>;
}
