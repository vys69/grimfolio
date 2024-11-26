"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CSSProperties } from "react";
import { isMobile } from "react-device-detect";

interface SlideshowLinkProps {
  href: string;
  text: string;
  images: readonly string[];
  imageSize?: { width: number; height: number };
  style?: CSSProperties;
  borderRadius?: number;
  animationSpeed?: number;
}

export function SlideshowLink({ 
  href, 
  text, 
  images, 
  imageSize = { width: 64, height: 64 },
  style,
  borderRadius = 8,
  animationSpeed = 6
}: SlideshowLinkProps) {
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

  // Create a duplicated array of images for seamless looping
  const extendedImages = [...images, ...images];

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
          className="fixed pointer-events-none z-50 origin-center
            animate-in zoom-in-50 duration-120 ease-out overflow-hidden"
          style={{ 
            left: position.x,
            top: position.y,
            width: imageSize.width,
            height: imageSize.height,
          }}
        >
          <div 
            className="flex whitespace-nowrap"
            style={{
              width: `${imageSize.width * extendedImages.length}px`,
              animation: `slide-left ${animationSpeed}s linear infinite`,
              gap: '10px'
            }}
          >
            {extendedImages.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`${text} preview`}
                width={imageSize.width}
                height={imageSize.height}
                className="object-cover"
                style={{ borderRadius: `${borderRadius}px` }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
} 