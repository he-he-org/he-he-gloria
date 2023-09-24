import s from './index.module.scss'

interface Props {
  children: string;
}

export default function P(props: Props) {
  return <p className={s.root}>{props.children}</p>;
}
