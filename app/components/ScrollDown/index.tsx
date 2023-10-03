import ArrowSvg from "./arrow.svg";
import s from "./index.module.scss";
import Text from "../Text";

interface Props {
  children: React.ReactNode;
}

export default function ScrollDown(props: Props) {
  return (
    <Text className={s.root}>
      <ArrowSvg className={s.arrow} />
      {props.children}
    </Text>
  );
}
