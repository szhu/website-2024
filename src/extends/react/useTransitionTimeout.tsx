import { useEffect, useState } from "react";

export default function useTransitionTimeout<T>(value: T, ms: number) {
  const [previousValue, setPreviousValue] = useState(value);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setPreviousValue(value);
    }, ms);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [value, ms]);

  return value !== previousValue;
}
