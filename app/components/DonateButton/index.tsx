import s from "./index.module.scss";
import Link from "next/link";

interface Props {
  isDisabled?: boolean;
  href?: string;
  onClick?: () => void;
  children: string;
}

export default function DonateButton(props: Props) {
  const { href, onClick, isDisabled } = props;

  const className = [s.root, isDisabled && s.isDisabled].join(" ");

  if (href != null) {
    return (
      <Link
        className={className}
        href={href}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button className={className} onClick={onClick} disabled={isDisabled}>
      {props.children}
    </button>
  );
}
