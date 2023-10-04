"use client";
import { useIsMobile } from "../../helpers/browser";

interface Props {
  height: number;
}

export default function Space(props: Props) {
  const isMobile = useIsMobile();
  if (isMobile) {
    return <></>;
  }
  return <div role="presentation" style={{ height: props.height }} />;
}
