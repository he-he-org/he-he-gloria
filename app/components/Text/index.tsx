import s from './index.module.scss'

interface Props {
  className?: string;
  children: React.ReactNode;
}

export default function P(props: Props) {
  return <p className={[s.root, props.className].join(' ')}>{props.children}</p>;
}
