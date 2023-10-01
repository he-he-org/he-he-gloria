"use client";
import React, { useLayoutEffect, useMemo, useState } from "react";
import { useScrollPosition, useViewportHeight } from "../../../helpers/browser";

interface Props {
  children: React.ReactNode;
}

const ANIMATION_SPEED = 0.2; // pixels per ms
const MAX_ANIMATION_TIME = 7000;
const REVERSE_ANIMATION_SPEED = ANIMATION_SPEED * 3; // pixels per ms
const PARALLAX_SPEED = 0.1;
const PARALLAX_SHIFT = 500;

export default function SvgAnimation(props: Props) {
  const { children } = props;
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  const position = useScrollPosition();
  const viewportHeight = useViewportHeight();
  const [show, setShow] = useState(false);

  const elementPagePosition = useMemo(() => {
    return position + (ref?.getBoundingClientRect()?.top ?? 0);
  }, [ref]);

  useLayoutEffect(() => {
    if (ref) {
      const rect = ref?.getBoundingClientRect();
      if (rect != null) {
        const viewThreshold = 100;
        const distanceFromCenter = Math.abs(
          rect.top + rect.height / 2 - viewportHeight / 2
        );
        const isVisible = distanceFromCenter < viewThreshold;
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
          let totalLength = group.reduce(
            (acc, x) => acc + x.getTotalLength(),
            0
          );
          let totalAnimationTime = Math.min(MAX_ANIMATION_TIME, totalLength / ANIMATION_SPEED);
          console.log("totalLength", totalLength)
          console.log("totalAnimationTime", totalAnimationTime)
          for (const maskElement of group) {
            const length = maskElement.getTotalLength();
            // const animationTime = length / ANIMATION_SPEED;
            const animationTime = totalAnimationTime * (length / totalLength);

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

  const parallaxElements = useMemo(() => {
    return ref
      ? [...ref.querySelectorAll<SVGPathElement>(`g[id^=parallax]`)]
      : [];
  }, [ref]);

  useLayoutEffect(() => {
    if (ref && parallaxElements.length > 0) {
      const rect = ref.getBoundingClientRect();
      const top = rect.top;
      const progress = Math.min(
        1,
        Math.max(0, (viewportHeight - top) / (viewportHeight + rect.height))
      );
      for (const parallaxElement of parallaxElements) {
        if (parallaxElement.id.startsWith("parallax:vertical")) {
          parallaxElement.style.transform = `translateY(${
            (PARALLAX_SHIFT - PARALLAX_SHIFT * 2 * progress) * PARALLAX_SPEED
          }px)`;
        } else if (parallaxElement.id.startsWith("parallax:transparency")) {
          const opacity =
            progress < 0.3 ? 0 : Math.min(1, (progress - 0.3) * 10);
          parallaxElement.style.opacity = `${opacity}`;
        }
      }
    }
  }, [ref, position, parallaxElements, elementPagePosition]);

  return <div ref={setRef}>{children}</div>;
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
  const { reverse, delay = 0, show, animationTime } = params;
  const length = pathElement.getTotalLength();
  pathElement.style.strokeDasharray = `${length}`;
  // const animationSpeed = reverse ? REVERSE_ANIMATION_SPEED : ANIMATION_SPEED;
  // const animationTime = length / animationSpeed;
  pathElement.style.transitionDuration = show ? `${animationTime}ms` : "0ms";
  pathElement.style.transitionDelay = show ? `${delay}ms` : "0ms";
  if (reverse) {
    if (show) {
      pathElement.style.strokeDashoffset = `-${length}`;
    }
  } else {
    if (show) {
      pathElement.style.strokeDashoffset = `0`;
    } else {
      pathElement.style.strokeDashoffset = `${length}`;
    }
  }
}
