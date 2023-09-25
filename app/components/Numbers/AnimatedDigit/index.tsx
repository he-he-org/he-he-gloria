"use client";
import s from "./index.module.scss";

interface Props {
  value: number;
  maxValue?: number;
  showZero?: boolean;
  animationTime?: number;
}

export default function AnimatedDigit(props: Props) {
  const { value, maxValue = 9, showZero = false, animationTime } = props;
  return (
    <div className={s.root}>
      <span className={s.maxValue}>{value}</span>
      <div
        className={s.digits}
        style={{
          transform: `translateY(-${(value / (maxValue + 1)) * 100}%)`,
          transitionDuration: `${animationTime}ms`,
        }}
      >
        {[...range(maxValue + 1)].map((_, i) => (
          <span key={i}>{showZero || i !== 0 ? i : "\u00A0"}</span>
        ))}
      </div>
    </div>
  );
}

function range(to: number): unknown[] {
  const result = [];
  result.length = to;
  return result;
}
