"use client";
import Illustration1Svg from "../../assets/illustration_1.svg";
import { useLayoutEffect, useState } from "react";
import { animateOpacity, queryPathGroups } from "../animation/SvgAnimation";
import s from "./index.module.scss";

export default function Map() {
  const [show, setShow] = useState(false);

  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (ref) {
      const groups = ref.querySelectorAll<SVGGraphicsElement>(
        "#animate-group\\/map"
      );
      for (const group of groups) {
        const children = group.children;
        let delay = 0;
        for (const child of children) {
          const el = child as SVGPathElement;
          const animationTime = 500;
          if (el.id === "titles") {
            const groups = queryPathGroups(el, "draw\\:reverse");
          } else {
            animateOpacity(el, {
              show,
              animationTime: animationTime,
              delay,
            });
            delay += animationTime;
          }
        }
      }
    }
  }, [ref, show]);

  useLayoutEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 500);
  }, []);

  return (
    <div ref={setRef} className={s.root}>
      <Illustration1Svg
          className={s.image}

      />
    </div>
  );
}
