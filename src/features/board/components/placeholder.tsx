import { useEffect, useState } from "react";
import styles from "./placeholder.module.css";
import { animate, linear } from "#frontend/shared/utils/animation";

const dots = [...Array(10)].map((_) => ".").join("");

export function BoardPlaceholder() {
  const [dotLength, setDotLength] = useState(0);

  useEffect(() => {
    const animationDuration = 1000;

    const drawFunction = (progress: number) => {
      const currentLength = Math.ceil(dots.length * progress);
      setDotLength(Math.max(1, currentLength));
    };

    const clearRequestAnimationFrame = animate({
      draw: drawFunction,
      duration: animationDuration,
      timing: linear,
      isInfinite: true,
    });

    return () => {
      clearRequestAnimationFrame();
    };
  }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.current}>
        <p>{`Loading${dots.slice(0, dotLength)}`}</p>
      </div>
      <div className={styles.daily}></div>
      <div className={styles.hourly}></div>
    </div>
  );
}
