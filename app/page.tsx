"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Mail, Moon, Github } from "lucide-react";
import { TOGGLE_KOFI_EVENT } from "@/components/KofiWidget";
import { ProjectLink } from "@/components/ProjectLink";
import { ReactTerminal } from "react-terminal";
import { GitHubProject } from "@/components/ProjectCard";
import Divider from "@/components/Divider";
import { NowPlaying } from "@/components/NowPlaying";
import { Oneko } from "@/components/Oneko";
import { isMobile } from "react-device-detect";
import { SlideshowLink } from "@/components/SlideshowLink";
import { TerminalButton } from "@/components/TerminalButton";
// Define the type for a contribution
type Contribution = {
  href: string;
  text: string;
  author: string;
  previewUrl: string;
  pullUrl?: string;  // Optional
  pullText?: string; // Optional
  imageSize: { width: number; height: number };
  description: string;
  slideshow?: boolean;
  images?: string[];
  animationSpeed?: number;
};

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleKofiClick() {
    window.dispatchEvent(new Event(TOGGLE_KOFI_EVENT));
  }

  const commands = {
    whoami: "jackharper",
    cd: (directory: string) => `changed path to ${directory}`
  };

  const projects = {
    grimslab: {
      href: "https://x.com/grim_labs",
      text: "grim's lab",
      borderRadius: 0,
      imageUrl: "/grim_logo.jpg",
      imageSize: { width: 48, height: 48 }
    },
    ripgrim: {
      href: "https://ripgrim.com",
      text: "ripgrim",
      borderRadius: 0,
      imageUrl: "/grim_logo.jpg",
      imageSize: { width: 48, height: 48 }
    },
    playground: {
      href: "#",
      text: "playground",
      borderRadius: 0,
      imageUrl: "/playground.png",
      imageSize: { width: 48, height: 48 }
    },
    fmstalker: {
      href: "https://fmstalker.com/",
      text: "fmstalker",
      borderRadius: 0,
      imageUrl: "/fmstalker.png",
      imageSize: { width: 48, height: 48 }
    },
    ezcart: {
      href: "https://ez-cart-ten.vercel.app/",
      text: "ezcart",
      borderRadius: 0,
      imageUrl: "/ezcart.png",
      imageSize: { width: 48, height: 48 }
    },
    fixroblox: {
      href: "https://github.com/vys69/FixRoblox",
      text: "fixroblox",
      borderRadius: 0,
      imageUrl: "/fixroblox.jpg",
      imageSize: { width: 100, height: 60 }
    }
  }

  const contributions: Record<string, Contribution> = {
    quickpic: {
      href: "https://github.com/t3dotgg/quickpic",
      text: "quickpic",
      author: "theo/t3.gg",
      previewUrl: "/quickpic-favi.png",
      pullText: "#62",
      pullUrl: "https://github.com/t3dotgg/quickpic/pull/62",
      imageSize: { width: 50, height: 50 },
      description: "Turn SVGs into high resolution PNGs in 2 clicks. Built because Theo was mad."
    },
    noplace: {
      href: "https://noplace.live",
      text: "noplace",
      author: "grim & eli",
      previewUrl: "/noplace.png",
      slideshow: true,
      images: [
        "/noplace.png",
        "/noplaceprofile.png",
        "/noplace.png"
      ],
      animationSpeed: 10,
      imageSize: { width: 200, height: 151 },
      description: "noplace, but on ALL devices"
    }
  }

  if (!mounted) {
    return (
      <div className="relative w-screen h-screen overflow-hidden bg-white dark:bg-neutral-950">
        <div className="relative w-[200vw] h-screen flex overflow-hidden">
          <div className="w-screen h-screen overflow-hidden">
            <div className="max-w-[min(100vh,600px)] aspect-square mx-auto p-8 flex flex-col">
              <div className="w-[52px] h-[52px] mb-6 relative overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse">
                <div className="absolute inset-0 bg-neutral-300 dark:bg-neutral-700" />
              </div>

              <div className="space-y-4">
                <div className="w-32 h-4 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />

                <div className="space-y-2">
                  <div className="w-full h-4 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                  <div className="w-3/4 h-4 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                </div>

                <div className="space-y-4 pt-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <div className="max-w-[min(100vh,600px)] mx-auto p-8">
        <div className="w-[52px] h-[52px] mb-6 relative rounded-full">
          <Image
            src="/grim_logo.jpg"
            alt="Profile"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-4 text-[15px] leading-relaxed">
          <div className="text-neutral-400 dark:text-neutral-500">Updated 11/24/2024</div>

          <div>
            I&apos;m a dev living in cali and working at{" "}
            <ProjectLink
              href={projects.grimslab.href}
              text={projects.grimslab.text}
              imageUrl={projects.grimslab.imageUrl}
              imageSize={projects.grimslab.imageSize}
              borderRadius={projects.grimslab.borderRadius}
            />
            .
          </div>
          {!isMobile && (
            <TerminalButton />
          )}

          <div>
            i enjoy just <span className="font-[500] underline decoration-wavy decoration-neutral-400">making shit</span>, and not limiting myself to just one tech stack or genre
          </div>

          <Divider />

          <div className="space-y-1">
            <div>
              some projects ive been working on:{" "}
            </div>
          </div>

          <div className="space-y-1">
            <div>
              <ProjectLink
                href={projects.fmstalker.href}
                text={projects.fmstalker.text}
                imageUrl={projects.fmstalker.imageUrl}
                imageSize={projects.fmstalker.imageSize}
                borderRadius={projects.fmstalker.borderRadius}
              />{" "}
              - a lastfm stats tracker
            </div>
            <div>
              <ProjectLink
                href={projects.ezcart.href}
                text={projects.ezcart.text}
                imageUrl={projects.ezcart.imageUrl}
                imageSize={projects.ezcart.imageSize}
                borderRadius={projects.ezcart.borderRadius}
              />{" "}
              - a realtime shopping cart calculator
            </div>
            <div>
              <ProjectLink
                href={projects.playground.href}
                text={projects.playground.text}
                imageUrl={projects.playground.imageUrl}
                imageSize={projects.playground.imageSize}
                borderRadius={projects.playground.borderRadius}
              />{" "}
              - a realtime shopify theme customizer
            </div>
            <div>
              <ProjectLink
                href={projects.fixroblox.href}
                text={projects.fixroblox.text}
                imageUrl={projects.fixroblox.imageUrl}
                imageSize={projects.fixroblox.imageSize}
                borderRadius={projects.fixroblox.borderRadius}
              />{" "}
              - fixes roblox embeds on discord
            </div>
          </div>


          <Divider />

          <div className="space-y-1">
            <div>
              some projects ive contributed to:{" "}
            </div>
          </div>

          <div className="space-y-2">
            {Object.values(contributions).map((contribution) => (
              <GitHubProject
                key={contribution.text}
                href={contribution.href}
                name={contribution.text}
                description={contribution.description}
                previewImage={contribution.previewUrl}
                pullUrl={contribution.pullUrl}
                pullText={contribution.pullText}
                imageSize={contribution.imageSize}
                slideshow={contribution.slideshow}
                images={contribution.images}
                animationSpeed={contribution.animationSpeed}
              />
            ))}
          </div>
          <div>
            Feel free to{" "}
            <a
              href="mailto:example@email.com"
              className="text-blue-500 hover:opacity-70 transition-opacity duration-120 inline-flex items-center"
            >
              send me an email
            </a>
            .
          </div>

          <div className="space-y-4">
            <NowPlaying />
          </div>

          <div className={`${isMobile ? "hidden" : "block"}`}>
            <Oneko />
          </div>

        </div>
      </div>
    </div>
  );
}