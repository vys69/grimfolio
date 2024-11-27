"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Create a custom event name
export const TOGGLE_KOFI_EVENT = 'toggle-kofi-widget';

export function KofiWidget() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Listen for the custom event
    const handleToggle = () => setIsVisible(prev => !prev);
    window.addEventListener(TOGGLE_KOFI_EVENT, handleToggle);
    return () => window.removeEventListener(TOGGLE_KOFI_EVENT, handleToggle);
  }, []);

  return (
    <>
      {isVisible && (
        <div 
          className="absolute w-full h-full overlay inset-0 bg-black/40 backdrop-blur-[2px] z-[10] transition-opacity duration-300"
          onClick={() => setIsVisible(false)}
          aria-hidden="true"
        />
      )}
      
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-10 rounded-full transition-transform hover:scale-110"
        aria-label="Toggle Ko-fi support widget"
      >
        <Image
          src="/kofi.png"
          width={100}
          height={100}
          alt="Ko-fi support"
        />
      </button>
      
      <iframe
        id="kofi-iframe"
        src="https://ko-fi.com/ripgrim/?hidefeed=true&widget=true&embed=true&preview=true"
        style={{ 
          border: "none", 
          width: "400px", 
          padding: "4px", 
          background: "#f9f9f9",
          position: "fixed",
          bottom: "-190px",
          right: "10px",
          transform: isVisible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 300ms ease-in-out",
          zIndex: 40
        }}
        height="712"
        title="ripgrim"
      ></iframe>
    </>
  );
}
