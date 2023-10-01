"use client";
import React, { useLayoutEffect, useState } from "react";
import s from "./index.module.scss";
import { useScrollPosition, useViewportHeight } from "../../../helpers/browser";

interface Props {
  children: React.ReactNode;
}

const ANIMATION_SPEED = 0.2; // pixels per ms
const REVERSE_ANIMATION_SPEED = ANIMATION_SPEED * 6; // pixels per ms

export default function SvgAnimation(props: Props) {
  const { children } = props;
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  const position = useScrollPosition();
  const viewportHeight = useViewportHeight();
  const [show, setShow] = useState(false);

  useLayoutEffect(() => {
    if (ref) {
      const rect = ref?.getBoundingClientRect();
      if (rect != null) {
        const viewThreshold = 100;
        const dist = Math.abs(rect.top + rect.height / 2 - viewportHeight / 2);
        console.log("dist", dist);
        const isVisible = dist < viewThreshold;
        if (isVisible) {
          setShow(true);
        }
      }
    }
  }, [ref, viewportHeight, position]);

  useLayoutEffect(() => {
    if (ref) {
      // Animate drawing
      {
        const groups: Array<SVGPathElement[]> = queryPathGroups(ref, "draw\\/");
        for (const group of groups) {
          let delay = 0;
          for (const maskElement of group) {
            const length = maskElement.getTotalLength();
            const animationTime = length / ANIMATION_SPEED;

            animatePath(maskElement, {
              reverse: false,
              animationTime,
              delay,
              show,
            });
            delay += animationTime;
          }
        }
      }

      // Animate reverse drawing
      {
        const groups: Array<SVGPathElement[]> = queryPathGroups(
          ref,
          "draw\\:reverse\\/"
        );
        for (const group of groups) {
          for (const maskElement of group) {
            const length = maskElement.getTotalLength();
            const animationTime = length / REVERSE_ANIMATION_SPEED;
            animatePath(maskElement, {
              reverse: true,
              animationTime,
              show,
            });
          }
        }
      }
    }
  }, [ref, show]);

  return (
    <div className={[s.root, show && "SHOW"].join(" ")} ref={setRef}>
      {children}
    </div>
  );
}

function queryPathGroups(
  parent: HTMLElement,
  idPrefix: string
): Array<SVGPathElement[]> {
  const groups: Array<SVGPathElement[]> = [];
  for (const group of parent?.querySelectorAll<SVGPathElement>(
    `g[id^=${idPrefix}]`
  )) {
    const groupElements = [...group.querySelectorAll("path")];
    groups.push(groupElements);
  }
  for (const el of parent?.querySelectorAll<SVGPathElement>(
    `path[id^=${idPrefix}]`
  )) {
    groups.push([el]);
  }
  return groups;
}

function animatePath(
  pathElement: SVGPathElement,
  params: {
    reverse: boolean;
    animationTime: number;
    show: boolean;
    delay?: number;
  }
) {
  const { reverse, delay = 0, show } = params;
  const length = pathElement.getTotalLength();
  pathElement.style.strokeDasharray = `${length}`;
  const animationSpeed = reverse ? REVERSE_ANIMATION_SPEED : ANIMATION_SPEED;
  const animationTime = length / animationSpeed;
  pathElement.style.transitionDuration = show ? `${animationTime}ms` : "0ms";
  if (reverse) {
    if (show) {
      pathElement.style.strokeDashoffset = `-${length}`;
      pathElement.style.transitionDelay = `${delay}ms`;
    }
  } else {
    if (show) {
      pathElement.style.strokeDashoffset = `0`;
      pathElement.style.transitionDelay = `${delay}ms`;
    } else {
      pathElement.style.strokeDashoffset = `${length}`;
    }
  }
}
