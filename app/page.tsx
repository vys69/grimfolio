"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Mail, Moon, Github, Twitter } from "lucide-react";
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
import { InfiniteSlider } from "@/components/motion/infinite-slider";
import { ScrollProgress } from '@/components/motion/scroll-progress';
import { InView } from '@/components/motion/in-view';
import { motion } from "framer-motion";
import { projects as projectsList } from "@/lib/constants";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  function route(path: string) {
    router.push(path);
  }

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
      href: "https://grim-playground.vercel.app/",
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
      previewUrl: "/logos/noplace.png",
      imageSize: { width: 50, height: 50 },
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
    <div className="min-h-screen overflow-x-hidden bg-white dark:bg-neutral-950">
      <div className="fixed inset-x-0 top-0 z-50">
        <div className="h-[1px] w-full bg-neutral-200 dark:bg-neutral-800" />
        <ScrollProgress
          className="h-[1px] bg-neutral-800 dark:bg-neutral-200"
          springOptions={{
            stiffness: 280,
            damping: 18,
            mass: 0.3,
          }}
        />
      </div>



      <div className="max-w-[min(100vh,600px)] mx-auto p-8 pt-12">
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
          <div className="text-neutral-400 dark:text-neutral-500">Updated 11/27/2024</div>

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

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="relative flex flex-col items-center justify-center p-4 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">
                <div className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">{projectsList.length}+</div>
                <div className="text-sm text-neutral-400 dark:text-neutral-500">Projects</div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                <button
                  className="text-sm text-neutral-800 dark:text-neutral-200 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 px-4 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  onClick={() => {
                    route("/clients?type=projects");
                  }}
                >
                  View Projects
                </button>
              </div>
            </div>

            <div className="relative flex flex-col items-center justify-center p-4 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">
                <div className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">100+</div>
                <div className="text-sm text-neutral-400 dark:text-neutral-500">Clients</div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                <button
                  className="text-sm text-neutral-800 dark:text-neutral-200 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 px-4 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  onClick={() => {
                    route("/clients?type=clients");
                  }}
                >
                  View Clients
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
              <div className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">4+</div>
              <div className="text-sm text-neutral-400 dark:text-neutral-500 flex items-center gap-1">
                <span>Yrs Expertise</span>
              </div>
            </div>
          </div>

          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="space-y-1">
              <div>
                some projects ive been working on:{" "}
              </div>
            </div>

            <div className="mt-2">
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
          </InView>

          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewOptions={{ margin: '0px 0px -100px 0px' }}
          >
            <div className="space-y-1">
              <div>
                some projects ive contributed to:{" "}
              </div>
            </div>

            <div className="mt-2 space-y-2">
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
          </InView>

          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewOptions={{ margin: '0px 0px -100px 0px' }}
          >
            <div className="space-y-4">
              <NowPlaying />
            </div>
          </InView>

          <div className="flex items-center justify-center w-full gap-4">
            <a href="mailto:grimstudioss@gmail.com">
              <Mail className="w-5 h-5 text-neutral-400 dark:text-neutral-500 hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors duration-120 cursor-pointer" />
            </a>
            <a href="https://x.com/fuckgrimlabs">
              <Twitter className="w-5 h-5 text-neutral-400 dark:text-neutral-500 hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors duration-120 cursor-pointer" />
            </a>
            <a href="https://github.com/vys69">
              <Github className="w-5 h-5 text-neutral-400 dark:text-neutral-500 hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors duration-120 cursor-pointer" />
            </a>
          </div>

          <div className={`${isMobile ? "hidden" : "block"}`}>
            <Oneko />
          </div>

        </div>
      </div>
    </div>
  );
}