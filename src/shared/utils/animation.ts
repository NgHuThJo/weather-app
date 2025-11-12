type Animation = {
  draw: (progress: number) => void;
  timing: (timeFraction: number) => number;
  duration: number;
  isInfinite: boolean;
};

export function animate({ draw, timing, duration, isInfinite }: Animation) {
  if (duration <= 0) {
    throw Error("Animation duration has to be positive number");
  }

  let start: number | null = null;
  let requestionAnimationFrameId: number | null = null;

  const animationCallback = (timestamp: number) => {
    if (start === null) {
      start = timestamp;
    }

    const timePassed = timestamp - start;
    const progress = timing(Math.min(timePassed / duration, 1));
    draw(progress);

    if (progress < 1) {
      requestionAnimationFrameId = requestAnimationFrame(animationCallback);
    } else if (isInfinite) {
      start = null;
      requestionAnimationFrameId = requestAnimationFrame(animationCallback);
    }
  };

  requestionAnimationFrameId = requestAnimationFrame(animationCallback);

  return () => {
    if (requestionAnimationFrameId !== null) {
      cancelAnimationFrame(requestionAnimationFrameId);
    }
  };
}

export function linear(timeFraction: number) {
  return timeFraction;
}

export function nthPower(x: number, timeFraction: number) {
  return Math.pow(timeFraction, x);
}

export function bounce(timeFraction: number) {
  for (let a = 0, b = 1; ; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return (
        -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
      );
    }
  }
}

export function elastic(x: number, timeFraction: number) {
  return (
    Math.pow(2, 10 * (timeFraction - 1)) *
    Math.cos(((20 * Math.PI * x) / 3) * timeFraction)
  );
}

export function makeEaseOut(timing: (timeFraction: number) => number) {
  return (timeFraction: number) => 1 - timing(1 - timeFraction);
}

export function makeEaseInOut(timing: (timeFraction: number) => number) {
  return (timeFraction: number) => {
    if (timeFraction < 0.5) {
      return timing(2 * timeFraction) / 2;
    }

    return (2 - timing(2 * (1 - timeFraction))) / 2;
  };
}
