"use client";

import { Technology } from "@/app/types";

interface TechIcon {
  icon?: string;
  label?: string;
}

const techIcons: Partial<Record<Technology, TechIcon>> = {
  "Liquid": { icon: "/tech/shopify/shopify-green.svg" },
  "JavaScript": { icon: "/tech/javascript.png" },
  "HTML": { icon: "/tech/html.webp" },
  "CSS": { icon: "/tech/css.png" },
  "React": { icon: "/tech/react.svg" },
  "Node.js": { icon: "/tech/nodejs.png", label: "Node.js" },
  "Typescript": { icon: "/tech/typescript.webp" },
  "Express": { icon: "/tech/javascript.png", label: "Express.js" },
  "Svelte": { icon: "/tech/svelte.svg", label: "Svelte" }
};

interface TechBadgeProps {
  tech: Technology;
  size?: "sm" | "md";
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
}

export function TechBadge({ tech, size = "md", onClick, selected, disabled }: TechBadgeProps) {
  const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const techInfo = techIcons[tech] || { label: tech };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-2 py-1 
        ${size === "sm" ? "text-xs" : "text-sm"} 
        border flex items-center gap-2
        ${selected 
          ? 'border-neutral-400 dark:border-neutral-400 text-neutral-800 dark:text-neutral-200' 
          : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
        }
        ${disabled && !selected ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {techInfo.icon ? (
        <img 
          src={techInfo.icon} 
          alt={tech}
          className={iconSize}
        />
      ) : null}
      <span className="ml-1">
        {techInfo.label || tech}
      </span>
    </button>
  );
} 