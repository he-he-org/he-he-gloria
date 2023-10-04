import s from "./index.module.scss";
import SocialNetworks from "../SocialNetworks";
import MainLogo from "../MainLogo";

interface Props {}

export default function Header(props: Props) {
  return (
    <div className={s.root}>
      <div className={s.content}>
        <MainLogo />
        <SocialNetworks />
      </div>
    </div>
  );
}
