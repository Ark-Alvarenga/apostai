import { useState, useEffect } from "react";

export const useVisibility = (
  ref: React.RefObject<HTMLElement>,
  threshold: number = 0.1
) => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHidden(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: threshold,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold]);

  return isHidden;
};
