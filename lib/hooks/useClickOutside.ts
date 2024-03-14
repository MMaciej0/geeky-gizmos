import { useEffect, useRef } from "react";

export const useClickOutside = <T extends HTMLElement>(handler: () => void) => {
  const ref = useRef<T>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      handler();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handler]);

  return ref;
};
