import { useEffect, useRef } from "react";

export function useResizeObserver(callback: ResizeObserverCallback) {
  const resizeObserverRef = useRef(new ResizeObserver(callback));

  const observeElement = <T extends HTMLElement>(element: T) => {
    resizeObserverRef.current.observe(element);
  };
  const unobserveElement = <T extends HTMLElement>(element: T) => {
    resizeObserverRef.current.unobserve(element);
  };
  const disconnect = () => {
    resizeObserverRef.current.disconnect();
  };

  useEffect(() => {
    resizeObserverRef.current = new ResizeObserver(callback);

    return () => {
      disconnect();
    };
  }, [callback]);

  return { observeElement, unobserveElement, disconnect };
}
