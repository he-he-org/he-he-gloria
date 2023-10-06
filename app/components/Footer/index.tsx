import s from "./index.module.scss";
import MainLogo from "../MainLogo";
import SocialNetworks from "../SocialNetworks";

interface Props {}

export default function Footer(props: Props) {
  return (
    <div className={s.root}>
      <div className={s.content}>
        <div className={s.leftText}>
          <MainLogo />
          <div className={s.copyright}>
            © Health & Help
            <br />
            All rights reserved.
            <br />
            International Charity Organization
            <br />
            Health & Help is a recognized 501(c)(3) not-for-profit organization
            by the IRS. EIN: 81-3432192
          </div>
        </div>
        <div className={s.people}>
          <div className={s.peopleGroup}>
            <div className={s.peopleRole}>Idea:</div>
            <div className={s.peopleList}>
              <div className={s.peopleItem}>Uliana Domanova</div>
            </div>
            <div className={s.peopleRole}>Design:</div>
            <div className={s.peopleList}>
              <div className={s.peopleItem}>Ale Abrosimova</div>
              <div className={s.peopleItem}>Alexey Duplyakov</div>
            </div>
          </div>
          <div className={s.peopleGroup}>
            <div className={s.peopleRole}>Supervision:</div>
            <div className={s.peopleList}>
              <div className={s.peopleItem}>Sviatoslava Bondarenko</div>
              <div className={s.peopleItem}>Valeriia Molchanova</div>
              <div className={s.peopleItem}>Ann Pavlenko</div>
              <div className={s.peopleItem}>Valentina Putilina</div>
              <div className={s.peopleItem}>Polina Druzina</div>
            </div>
          </div>
          <div className={s.peopleGroup}>
            <div className={s.peopleRole}>Development:</div>
            <div className={s.peopleList}>
              <div className={s.peopleItem}>Nikolai Mavrenkov</div>
            </div>
            <div className={s.peopleRole}>Text:</div>
            <div className={s.peopleList}>
              <div className={s.peopleItem}>Clara Awuse</div>
              <div className={s.peopleItem}>Aizhan Kazak</div>
            </div>
          </div>
          <div className={s.peopleGroup}>
            <div className={s.peopleRole}>Photo:</div>
            <div className={s.peopleList}>
              <div className={s.peopleItem}>Polina Shumkova</div>
              <div className={s.peopleItem}>Evfrosiniia Kapustina</div>
              <div className={s.peopleItem}>Markova Olga</div>
              <div className={s.peopleItem}>Vlasova Elena</div>
            </div>
          </div>
        </div>
        <SocialNetworks />
      </div>
    </div>
  );
}
