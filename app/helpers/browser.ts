import { useLayoutEffect, useState } from "react";

export function useScrollPosition() {
  const [position, setPosition] = useState(window.scrollY);
  useLayoutEffect(() => {
    const handler = () => {
      setPosition(window.scrollY);
    };
    window.addEventListener(`scroll`, handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);
  return position;
}

export function useViewportHeight() {
  const [value, setValue] = useState(window.innerHeight);
  useLayoutEffect(() => {
    const handler = () => {
      setValue(window.innerHeight);
    };
    window.addEventListener(`resize`, handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);
  return value;
}
