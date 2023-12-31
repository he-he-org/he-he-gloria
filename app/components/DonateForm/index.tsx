import DonateLogoSvg from "./donate_logo.svg";
import IllustrationSvg from "./illustration.svg";
import s from "./index.module.scss";
import Header1 from "../Header1";
import PaymentForm from "./PaymentForm";

export const DONATE_FORM_ANCHOR = "donate";
export function DonateForm() {
  return (
    <div className={s.root} id={DONATE_FORM_ANCHOR}>
      <DonateLogoSvg className={s.logo} />
      <div className={s.header}>
        <Header1>Would you like to help?</Header1>
      </div>
      <div className={s.body}>
        <IllustrationSvg className={s.illustration} />
        <PaymentForm />
      </div>
    </div>
  );
}
