import s from "./index.module.scss";

interface Props {
}

export default function Numbers(props: Props) {
  return (
    <div className={s.root}>
      <div className={s.top}>
        <div className={s.red}>
          <div className={s.value}>145</div>
          <div className={s.title}>volunteers</div>
        </div>
        <div className={s.white}>
          <div className={s.value}>36</div>
          <div className={s.title}>countries</div>
        </div>
      </div>
      <div className={s.bottom}>
        <div className={s.white}>
          <div className={s.value}>2</div>
          <div className={s.title}>clinics</div>
        </div>
      </div>
    </div>
  );
}
