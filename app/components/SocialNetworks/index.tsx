import s from "./index.module.scss";
import InstagramSvg from "./instagram.svg";
import FacebookSvg from "./facebook.svg";
import LinkedinSvg from "./linked_in.svg";
import YoutubeSvg from "./you_tube.svg";

interface Props {}

export default function SocialNetworks(props: Props) {
  return (
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
  );
}
