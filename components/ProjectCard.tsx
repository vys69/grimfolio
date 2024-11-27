"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CSSProperties } from "react";
import { ExternalLink, Github, Link } from "lucide-react";
import { isMobile } from "react-device-detect";
import { Button } from "./ui/button";
import { Spotlight } from '@/components/motion/spotlight';

interface GitHubProjectProps {
  href: string;
  name: string;
  description?: string;
  previewImage?: string;
  style?: CSSProperties;
  className?: string;
  pullUrl?: string;
  pullText?: string;
  imageSize?: { width: number; height: number };
  slideshow?: boolean;
  images?: string[];
  animationSpeed?: number;
}

export function GitHubProject({ 
  href, 
  name,
  description,
  previewImage,
  style,
  className = "",
  pullUrl,
  pullText,
  imageSize = { width: 200, height: 120 },
  slideshow = false,
  images = [],
  animationSpeed = 6
}: GitHubProjectProps) {
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

  const shouldShowHover = !isMobile && shouldRender && previewImage;

  return (
    <>
      {/* Desktop version with spotlight */}
      <div className="hidden lg:block relative overflow-hidden rounded-xl bg-neutral-200/30 p-[1px] dark:bg-neutral-800/30">
        <Spotlight
          className="from-blue-500/40 via-blue-500/20 to-blue-500/10 blur-xl 
            dark:from-blue-400/40 dark:via-blue-400/20 dark:to-blue-400/10"
          size={124}
        />
        <a
          href={href}
          className={`relative block p-4 rounded-xl bg-white dark:bg-black 
            transition-all duration-200 ${className}`}
          style={style}
          onMouseEnter={!isMobile ? handleMouseEnter : undefined}
          onMouseLeave={!isMobile ? () => setIsHovered(false) : undefined}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-lg font-medium flex items-center gap-2">
                <Github className="h-5 w-5" />
                / {name}
                {pullText && (
                  <Button
                    variant="link" 
                    style={{
                      padding: 0,
                      margin: 0,
                      textDecoration: 'none'
                    }}
                    onClick={
                      (e) => {
                        e.preventDefault();
                        window.location.href = pullUrl!;
                      }
                    }
                  >
                    <span className="mt-[4px] text-sm text-blue-500 dark:text-blue-400 hover:text-[15px] transition-all duration-200">
                      {pullText}
                    </span>
                  </Button>
                )}
              </div>
            </div>
            {description && (
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {description}
              </p>
            )}
          </div>
        </a>
      </div>

      {/* Mobile/Tablet version with regular border */}
      <div className="lg:hidden">
        <a
          href={href}
          className={`block p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 
            hover:border-neutral-300 dark:hover:border-neutral-700 
            transition-all duration-200 bg-white dark:bg-black ${className}`}
          style={style}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-lg font-medium flex items-center gap-2">
                <Github className="h-5 w-5" />
                / {name}
                {pullText && (
                  <Button
                    variant="link" 
                    style={{
                      padding: 0,
                      margin: 0,
                      textDecoration: 'none'
                    }}
                    onClick={
                      (e) => {
                        e.preventDefault();
                        window.location.href = pullUrl!;
                      }
                    }
                  >
                    <span className="mt-[4px] text-sm text-blue-500 dark:text-blue-400 hover:text-[15px] transition-all duration-200">
                      {pullText}
                    </span>
                  </Button>
                )}
              </div>
            </div>
            {description && (
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {description}
              </p>
            )}
          </div>
        </a>
      </div>

      {shouldShowHover && (
        <div 
          className={`fixed pointer-events-none z-50 origin-center
            animate-in zoom-in
            ${!isHovered ? "animate-out zoom-out-50 duration-120 ease-in" : ""}`}
          style={{ 
            left: position.x,
            top: position.y
          }}
        >
          {slideshow && images.length > 0 ? (
            // Slideshow preview
            <div 
              className="overflow-hidden"
              style={{ 
                width: imageSize.width,
                height: imageSize.height
              }}
            >
              <div 
                className="flex whitespace-nowrap h-full"
                style={{
                  width: `${imageSize.width * images.length * 2}px`,
                  animation: `slide-left ${animationSpeed}s linear infinite`
                }}
              >
                {[...images, ...images].map((image, i) => (
                  <div 
                    key={i} 
                    className="shrink-0 relative h-full"
                    style={{
                      width: imageSize.width,
                    }}
                  >
                    <Image
                      src={image}
                      alt={`${name} preview ${i + 1}`}
                      fill
                      className="object-cover ring-2 ring-white dark:ring-neutral-900"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Static preview
            <Image
              src={previewImage!}
              alt={`${name} preview`}
              width={imageSize.width}
              height={imageSize.height}
              className="object-cover ring-2 ring-white dark:ring-neutral-900"
            />
          )}
        </div>
      )}
    </>
  );
} 