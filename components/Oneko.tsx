"use client";

import { useEffect } from "react";
import { createOneko } from "@/lib/oneko";

export function Oneko() {
  useEffect(() => {
    // Initialize oneko with sprite paths
    const cleanup = createOneko("/sprite.gif", "/final.png");
    
    // Cleanup on unmount
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return null;
}