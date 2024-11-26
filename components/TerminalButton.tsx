"use client";

import { Terminal } from "lucide-react";
import { useState, useEffect } from "react";
import { ReactTerminal } from "react-terminal";
import { useTheme } from "next-themes";

export function TerminalButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // Handle mounting for theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle opening and closing with proper mounting/unmounting
  const handleOpen = () => {
    setShouldRender(true);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setShouldRender(false);
    }, 300);
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      // Handle Ctrl+C or Cmd+C (Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        if (isExecuting) {
          setIsExecuting(false);
          window.activateNekoHyperspeed?.(0);
          console.log('Command execution interrupted');
        }
      }

      // Handle Escape key
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isExecuting]);

  // Terminal commands and welcome message
  const commands = {
    help: "Available commands: hyperspeed [speed]",
    hyperspeed: (speed?: string) => {
      const parsedSpeed = speed ? parseFloat(speed) : 3;
      
      if (isNaN(parsedSpeed) || parsedSpeed <= 0) {
        return "Speed must be a positive number!";
      }
      
      if (parsedSpeed > 10) {
        return "Whoa there! That's too fast! (max speed: 10)";
      }

      setIsExecuting(true);
      console.log(`HYPERSPEED ACTIVATED! (${parsedSpeed}x speed)`);
      (window.activateNekoHyperspeed as (speed: number) => void)?.(parsedSpeed);

      // Reset executing state after hyperspeed ends
      setTimeout(() => {
        setIsExecuting(false);
      }, 5000);

      return `NYOOOOOOOOM! ☠️💨 ${parsedSpeed}x speed`;
    }
  };

  // Define themes based on site theme
  const terminalThemes = {
    "light-theme": {
      themeBGColor: "hsl(0 0% 100%)", // --background
      themeToolbarColor: "hsl(0 0% 100%)", // --background
      themeColor: "hsl(0 0% 3.9%)", // --foreground
      themePromptColor: "hsl(221.2 83.2% 53.3%)", // blue-500
    },
    "dark-theme": {
      themeBGColor: "hsl(0 0% 3.9%)", // --background
      themeToolbarColor: "hsl(0 0% 3.9%)", // --background
      themeColor: "hsl(0 0% 98%)", // --foreground
      themePromptColor: "hsl(217.2 91.2% 59.8%)", // blue-400
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className="fixed bottom-4 left-4 p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors z-[9999] shadow-sm"
        aria-label="Toggle terminal"
      >
        <Terminal className="h-6 w-6 text-neutral-800 dark:text-neutral-100" />
      </button>

      {shouldRender && (
        <>
          {/* Terminal Overlay */}
          <div 
            className={`fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[99999] transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleClose}
          />

          {/* Terminal Window */}
          <div
            className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[600px] h-[50vh] rounded-lg overflow-hidden shadow-xl z-[999999] transition-all duration-300 transform ${
              isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <ReactTerminal
              commands={commands}
              welcomeMessage="Welcome to the terminal! Type 'help' to see available commands."
              themes={terminalThemes}
              theme={theme === 'dark' ? 'dark-theme' : 'light-theme'}
            />
          </div>
        </>
      )}
    </>
  );
}