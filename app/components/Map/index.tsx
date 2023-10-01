"use client";
import Illustration1Svg from "../../assets/illustration_1.svg";
import { useLayoutEffect, useState } from "react";
import {animateOpacity, queryPathGroups} from "../animation/SvgAnimation";

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
          const animationTime = 2000;
          if (el.id === 'titles') {
            const groups = queryPathGroups(el, 'draw\\:reverse');
            console.log("groups", groups)
          } else {
            animateOpacity(el, {
              show,
              animationTime: animationTime,
              delay,
            });
            el.style.opacity = `${show ? 1 : 0}`;
            el.style.transitionProperty = `opacity`;
            el.style.transitionDuration = `${show ? animationTime : 0}ms`;
            el.style.transitionDelay = `${show ? delay : 0}ms`;
            delay += animationTime;
          }
        }
      }
    }
  }, [ref, show]);

  useLayoutEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 2000);
  }, []);

  return (
    <div ref={setRef}>
      <Illustration1Svg
        style={{
          position: "absolute",
          top: 0,
          right: 0,
        }}
      />
    </div>
  );
}

function animateNode(
  element: HTMLElement,
  params: {
    delay: number;
  }
) {}
