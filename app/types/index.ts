export type Technology = 
  | "Liquid" 
  | "JavaScript" 
  | "HTML" 
  | "CSS" 
  | "React" 
  | "Node.js"
  | "Typescript"
  | "Express"
  | "Svelte";
export type ProjectTag = 
  | "featured" 
  | "openSource" 
  | "projects" 
  | "personal" 
  | "clients";
export type ProjectType = "all" | ProjectTag;
export type SortType = "newest" | "oldest";

export interface Project {
  name: string;
  description: string;
  image: string;
  hoverVideo: string;
  repo?: string;
  link: string;
  technologies: Technology[];
  tags: ProjectTag[];
  date: Date;
} 