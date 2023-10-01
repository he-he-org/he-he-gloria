"use client";
import React, { useLayoutEffect, useMemo, useState } from "react";
import { useScrollPosition, useViewportHeight } from "../../../helpers/browser";

interface Props {
  children: React.ReactNode;
}

const ANIMATION_SPEED = 0.2; // pixels per ms
const MAX_ANIMATION_TIME = 7000;
const REVERSE_ANIMATION_SPEED = ANIMATION_SPEED * 3; // pixels per ms
const PARALLAX_SPEED = 0.3;
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
          const totalLength = group.reduce(
            (acc, x) => acc + x.getTotalLength(),
            0
          );
          const totalAnimationTime = Math.min(
            MAX_ANIMATION_TIME,
            totalLength / ANIMATION_SPEED
          );
          for (const maskElement of group) {
            const length = maskElement.getTotalLength();
            // const animationTime = length / ANIMATION_SPEED;
            const animationTime = totalAnimationTime * (length / totalLength);

            animateDraw(maskElement, {
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
            animateReverseDraw(maskElement, {
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
            (-PARALLAX_SHIFT + PARALLAX_SHIFT * progress) * PARALLAX_SPEED
          }px)`;
        } else if (parallaxElement.id.startsWith("parallax:transparency")) {
          const opacity =
            progress < 0.4 ? 0 : Math.min(1, (progress - 0.4) * 10);
          parallaxElement.style.opacity = `${opacity}`;
        }
      }
    }
  }, [ref, position, parallaxElements, elementPagePosition]);

  return <div ref={setRef}>{children}</div>;
}

export function queryPathGroups(
  parent: HTMLElement | SVGElement,
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

export function animateOpacity(
  pathElement: SVGPathElement,
  params: {
    animationTime: number;
    show: boolean;
    delay?: number;
  }
) {
  const { delay = 0, show, animationTime } = params;
  pathElement.style.opacity = `${show ? 1 : 0}`;
  pathElement.style.transitionProperty = `opacity`;
  pathElement.style.transitionTimingFunction = `ease-in-out`;
  pathElement.style.transitionDuration = `${show ? animationTime : 0}ms`;
  pathElement.style.transitionDelay = `${show ? delay : 0}ms`;
}

export function animateDraw(
  pathElement: SVGPathElement,
  params: {
    animationTime: number;
    show: boolean;
    delay?: number;
  }
) {
  const { delay = 0, show, animationTime } = params;
  const length = pathElement.getTotalLength();
  pathElement.style.strokeDasharray = `${length}`;
  // const animationSpeed = reverse ? REVERSE_ANIMATION_SPEED : ANIMATION_SPEED;
  // const animationTime = length / animationSpeed;
  pathElement.style.transitionDuration = show ? `${animationTime}ms` : "0ms";
  pathElement.style.transitionDelay = show ? `${delay}ms` : "0ms";
  if (show) {
    pathElement.style.strokeDashoffset = `0`;
  } else {
    pathElement.style.strokeDashoffset = `${length}`;
  }
}

export function animateReverseDraw(
  pathElement: SVGPathElement,
  params: {
    animationTime: number;
    show: boolean;
    delay?: number;
  }
) {
  const { delay, show, animationTime } = params;
  const length = pathElement.getTotalLength();
  pathElement.style.strokeDasharray = `${length}`;
  pathElement.style.transitionDuration = show ? `${animationTime}ms` : "0ms";
  pathElement.style.transitionDelay = show ? `${delay}ms` : "0ms";
  if (show) {
    pathElement.style.strokeDashoffset = `-${length}`;
  }
}
