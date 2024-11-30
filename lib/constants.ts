import { Project } from "@/app/types";

export const projects: Project[] = [
    {
        name: "SYNICAL",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image: "/projects/synical/screenshot.png",
        hoverVideo: "/projects/synical/video.mp4",
        link: "https://synicalglobal.com",
        technologies: ["Liquid", "JavaScript", "HTML", "CSS"],
        tags: ["featured", "clients"],
        date: new Date('2024-01-01')
      },
      {
        name: "DITCH",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image: "/projects/ditch/screenshot.jpeg",
        hoverVideo: "/projects/ditch/video.mp4",
        link: "https://ditch.la",
        technologies: ["Liquid", "JavaScript", "HTML", "CSS"],
        tags: ["clients"],
        date: new Date('2024-01-01')
      },
      {
        name: "RIPGRIM",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image: "/projects/ripgrim/screenshot.jpeg",
        hoverVideo: "/projects/ripgrim/video.mp4",
        link: "https://ripgrim.com",
        repo: "https://github.com/vys69/ripgrim.com",
        technologies: ["Svelte", "JavaScript"],
        tags: ["projects", "openSource"],
        date: new Date('2024-01-01')
      },
      {
        name: "FIXROBLOX",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image: "/projects/fixroblox/logo.jpg",
        hoverVideo: "/projects/fixroblox/video.mp4",
        link: "https://github.com/vys69/fixroblox",
        technologies: ["Liquid", "JavaScript", "HTML", "CSS"],
        tags: ["featured"],
        date: new Date('2024-01-01')
      },
]; 