import s from "./index.module.scss";
import LogoSvg from "./logo.svg";
import InstagramSvg from "./instagram.svg";
import FacebookSvg from "./facebook.svg";
import LinkedinSvg from "./linkedin.svg";
import YoutubeSvg from "./youtube.svg";

interface Props {}

export default function Header(props: Props) {
  return (
    <div className={s.root}>
      <div className={s.content}>
        <a href="https://he-he.org/" className={s.logo}>
          <LogoSvg />
        </a>
        <div className={s.links}>
          <a
            className={s.link}
            href="https://www.instagram.com/health2help.eng/"
            target="_blank"
          >
            <InstagramSvg width={17} height={17} />
          </a>
          <a
            className={s.link}
            href="https://www.facebook.com/healthandhelporg/"
            target="_blank"
          >
            <FacebookSvg width={10} height={19} />
          </a>
          <a
            className={s.link}
            href="https://www.linkedin.com/company/health-help/mycompany/"
            target="_blank"
          >
            <LinkedinSvg width={19} height={19} />
          </a>
          <a
            className={s.link}
            href="https://www.youtube.com/@HealthHelporg/featured"
            target="_blank"
          >
            <YoutubeSvg width={22} height={15} />
          </a>
        </div>
      </div>
    </div>
  );
}
