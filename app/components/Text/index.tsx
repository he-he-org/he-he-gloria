import s from './index.module.scss'

interface Props {
  children: React.ReactNode;
}

export default function P(props: Props) {
  return <p className={s.root}>{props.children}</p>;
}
