"use client";
import { useLayoutEffect, useState } from "react";

function useWindow(): Window | null {
  return global?.window ?? null;
}

export function useIsMobile() {
  const window = useWindow();
  const [value, setValue] = useState(false);
  useLayoutEffect(() => {
    const handler = () => {
      setValue((window?.innerWidth ?? 0) < 1280);
    };
    window?.addEventListener(`resize`, handler);
    return () => {
      window?.removeEventListener("resize", handler);
    };
  }, []);
  return value;
}

export function useScrollPosition() {
  const window = useWindow();
  const [position, setPosition] = useState(window?.scrollY ?? 0);
  useLayoutEffect(() => {
    const handler = () => {
      setPosition(window?.scrollY ?? 0);
    };
    window?.addEventListener(`scroll`, handler);
    return () => {
      window?.removeEventListener("scroll", handler);
    };
  }, []);
  return position;
}

export function useViewportHeight() {
  const window = useWindow();
  const [value, setValue] = useState(window?.innerHeight ?? 0);
  useLayoutEffect(() => {
    const handler = () => {
      setValue(window?.innerHeight ?? 0);
    };
    window?.addEventListener(`resize`, handler);
    return () => {
      window?.removeEventListener("resize", handler);
    };
  }, []);
  return value;
}
