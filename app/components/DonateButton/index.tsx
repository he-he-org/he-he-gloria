import s from './index.module.scss'

interface Props {
  children: string;
}

export default function DonateButton(props: Props) {
  return <button className={s.root}>{props.children}</button>;
}
