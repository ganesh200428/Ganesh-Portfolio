import { useEffect, useState } from "react";

const STORAGE_KEY = "gs-reduced-motion";
const EVENT_NAME = "gs-reduced-motion-change";

export function getManualReducedMotion(): boolean | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === null ? null : stored === "true";
}

export function setManualReducedMotion(value: boolean) {
  window.localStorage.setItem(STORAGE_KEY, String(value));
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: value }));
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const manual = getManualReducedMotion();
    setReduced(manual ?? mq.matches);

    const handler = (e: MediaQueryListEvent) => {
      if (getManualReducedMotion() === null) setReduced(e.matches);
    };
    const onManualChange = (e: Event) => setReduced((e as CustomEvent<boolean>).detail);

    mq.addEventListener("change", handler);
    window.addEventListener(EVENT_NAME, onManualChange);
    return () => {
      mq.removeEventListener("change", handler);
      window.removeEventListener(EVENT_NAME, onManualChange);
    };
  }, []);

  return reduced;
}
