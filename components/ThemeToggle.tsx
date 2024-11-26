"use client";

import { useTheme } from "next-themes";
import "@theme-toggles/react/css/Around.css"
import { Around } from "@theme-toggles/react"
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="z-10 fixed h-10 w-20 top-4 right-4 p-2 rounded-full">
      <Around 
        duration={750} 
        className="theme-toggle"
        color="neutral"
        toggled={theme === 'dark'}
        toggle={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
    </div>
  );
}