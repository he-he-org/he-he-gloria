import s from "./index.module.scss";
import LogoSvg from "./logo.svg";
import SocialNetworks from "../SocialNetworks";

interface Props {}

export default function MainLogo(props: Props) {
  return (
    <a href="https://he-he.org/" className={s.logo}>
      <LogoSvg />
    </a>
  );
}
