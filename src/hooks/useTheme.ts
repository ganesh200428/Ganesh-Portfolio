import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "gs-theme";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const root = document.documentElement;
    const read = () => setTheme(root.classList.contains("light") ? "light" : "dark");
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = document.documentElement.classList.contains("light") ? "dark" : "light";
    document.documentElement.classList.toggle("light", next === "light");
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  return { theme, toggle };
}
