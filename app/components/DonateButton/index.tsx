import s from "./index.module.scss";

interface Props {
  isDisabled?: boolean
  onClick?: () => void;
  children: string;
}

export default function DonateButton(props: Props) {
  return (
    <button className={s.root} onClick={props.onClick} disabled={props.isDisabled}>
      {props.children}
    </button>
  );
}
