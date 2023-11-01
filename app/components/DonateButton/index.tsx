import s from "./index.module.scss";
import Link from "next/link";

interface Props {
  isDisabled?: boolean;
  href?: string;
  onClick?: () => void;
  children: string;
  style?: object;
}

export default function DonateButton(props: Props) {
  const { href, onClick, isDisabled } = props;

  const className = [s.root, isDisabled && s.isDisabled].join(" ");

  if (href != null) {
    return (
      <div className={s.buttonContainer}>
        <a className={className} href={href} style={props.style}>
          {props.children}
        </a>
      </div>
    );
  }

  return (
    <div className={s.buttonContainer}>
      <button
        className={className}
        onClick={onClick}
        disabled={isDisabled}
        style={props.style}
      >
        {props.children}
      </button>
    </div>
  );
}
