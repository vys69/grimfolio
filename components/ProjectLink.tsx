"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CSSProperties } from "react";
import { isMobile } from "react-device-detect";
interface ProjectLinkProps {
  href: string;
  text: string;
  imageUrl: string;
  imageSize?: { width: number; height: number };
  style?: CSSProperties;
  borderRadius?: number;
}

export function ProjectLink({ 
  href, 
  text, 
  imageUrl, 
  imageSize = { width: 64, height: 64 },
  style,
  borderRadius = 8
}: ProjectLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e: React.MouseEvent) => {
    setPosition({
      x: e.clientX + 10,
      y: e.clientY + 10
    });
    setIsHovered(true);
  };

  useEffect(() => {
    if (isHovered) {
      setShouldRender(true);
    } else {
      const timeout = setTimeout(() => {
        setShouldRender(false);
      }, 120);
      return () => clearTimeout(timeout);
    }
  }, [isHovered]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isHovered) {
        setPosition({
          x: e.clientX + 15,
          y: e.clientY + 15
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered]);

  return (
    <>
      <a
        href={href}
        className="text-blue-500 hover:opacity-70 transition-opacity duration-120 inline-flex items-center"
        style={style}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
      >
        {text}
      </a>
      
      {shouldRender && !isMobile && (
        <div 
          className={`fixed pointer-events-none z-50 origin-center
            animate-in zoom-in-50 duration-120 ease-out
            ${!isHovered ? "animate-out zoom-out-50 duration-120 ease-in" : ""}`}
          style={{ 
            left: position.x,
            top: position.y,
            width: imageSize.width,
            height: imageSize.height,
          }}
        >
          <Image
            src={imageUrl}
            alt={`${text} preview`}
            width={imageSize.width}
            height={imageSize.height}
            className="object-cover"
            style={{ borderRadius: `${borderRadius}px` }}
          />
        </div>
      )}
    </>
  );
} 