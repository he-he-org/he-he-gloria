"use client";
import Illustration1Svg from "../../assets/illustration_1.svg";
import { useLayoutEffect, useState } from "react";
import ShowHide from "../animation/ShowHide";

export default function Map() {
  const [show, setShow] = useState(false);

  useLayoutEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 3000);
  }, []);
  return (
    <ShowHide isVisible={show} animationTime={1000}>
      {(props) => (
        <Illustration1Svg
          style={{
            ...props.style,
            position: "absolute",
            top: 0,
            right: 0,
          }}
        />
      )}
    </ShowHide>
  );
}
