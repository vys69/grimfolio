"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { InView } from '@/components/motion/in-view';
import { TechBadge } from '@/app/components/TechBadge';
import { Project, Technology, ProjectType, SortType, ProjectTag } from "@/app/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSearchParams, useRouter } from 'next/navigation';
import { Github, Globe, Link2 } from "lucide-react";
import { projects } from "@/lib/constants";

export default function ProjectsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') as ProjectType || "all";

  function route(path: string) {
    router.push(path);
  }

  const [projectType, setProjectType] = useState<ProjectType>(initialType);
  const [selectedTechnologies, setSelectedTechnologies] = useState<Technology[]>([]);
  const [sortBy, setSortBy] = useState<SortType>("newest");
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const technologies: Technology[] = [
    "Liquid",
    "JavaScript",
    "HTML",
    "CSS",
    "React",
    "Node.js",
    "Typescript",
    "Express",
    "Svelte"
  ];

  const toggleTechnology = (tech: Technology) => {
    setSelectedTechnologies(prev =>
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const filteredAndSortedProjects = projects
    .filter(project => {
      if (projectType === "all") return true;
      return project.tags.includes(projectType as ProjectTag);
    })
    .filter(project => {
      if (selectedTechnologies.length > 0) {
        return selectedTechnologies.every(tech => project.technologies.includes(tech));
      }
      return true;
    })
    .reduce<Project[]>((acc, project) => {
      if (project.tags.includes("featured")) {
        const firstNonFeaturedIndex = acc.findIndex(p => !p.tags.includes("featured"));
        if (firstNonFeaturedIndex === -1) {
          acc.push(project);
        } else {
          acc.splice(firstNonFeaturedIndex, 0, project);
        }
      } else {
        acc.push(project);
      }
      return acc;
    }, [])
    .sort((a, b) => {
      const aFeatured = a.tags.includes("featured");
      const bFeatured = b.tags.includes("featured");

      if (aFeatured === bFeatured) {
        return sortBy === "newest"
          ? b.date.getTime() - a.date.getTime()
          : a.date.getTime() - b.date.getTime();
      }

      return 0;
    });

  // Initialize refs for each project
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, projects.length);
  }, [projects]);

  const getVisibleCount = (screenSize: 'sm' | 'md' | 'lg') => {
    switch (screenSize) {
      case 'sm': return 2;
      case 'md': return 3;
      case 'lg': return 3;
      default: return 2;
    }
  };

  const TechBadgeList = ({ technologies }: { technologies: Technology[] }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="flex items-center gap-2 overflow-x-auto">
        {/* Mobile (2 visible) */}
        <div className="sm:hidden flex items-center gap-2">
          {technologies.slice(0, 2).map(tech => (
            <TechBadge key={tech} tech={tech} size="sm" />
          ))}
        </div>

        {/* Tablet (2 visible) */}
        <div className="hidden sm:flex md:hidden items-center gap-2">
          {technologies.slice(0, 2).map(tech => (
            <TechBadge key={tech} tech={tech} size="sm" />
          ))}
        </div>

        {/* Desktop (3 visible) */}
        <div className="hidden md:flex items-center gap-2">
          {technologies.slice(0, 3).map(tech => (
            <TechBadge key={tech} tech={tech} size="sm" />
          ))}
        </div>

        {/* "More" badge */}
        {technologies.length > getVisibleCount('lg') && (
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <button
                className="flex-shrink-0 px-2 py-1 text-xs bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 rounded hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
              >
                +{technologies.length - getVisibleCount('lg')} more
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-2 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800"
              onClick={(e) => e.stopPropagation()}
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-row flex-wrap gap-2"
                >
                  {technologies.slice(getVisibleCount('lg')).map(tech => (
                    <TechBadge key={tech} tech={tech} size="sm" />
                  ))}
                </motion.div>
              </AnimatePresence>
            </PopoverContent>
          </Popover>
        )}
      </div>
    );
  };

  // Set initial project type from URL parameter
  useEffect(() => {
    const type = searchParams.get('type') as ProjectType;
    if (type) {
      setProjectType(type);
    }
  }, [searchParams]);

  const handleProjectTypeChange = (value: ProjectType) => {
    setProjectType(value);
    // Clear the URL parameter by pushing the base path
    router.push('/clients');
  };

  const getAvailableTechnologies = (selectedTechs: Technology[]) => {
    if (selectedTechs.length === 0) return technologies;

    return technologies.filter(tech => {
      // If this tech is already selected, it's available
      if (selectedTechs.includes(tech)) return true;

      // Check if any project has all currently selected technologies AND this technology
      return projects.some(project => 
        [...selectedTechs, tech].every(selectedTech => 
          project.technologies.includes(selectedTech)
        )
      );
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto p-8">
        <InView>
          <div className="text-left mb-8">
            <Link
              href="/"
              className="inline-block mt-4 px-4 py-2 dark:bg-neutral-950 dark:text-neutral-100 border dark:border-neutral-800"
            >
              ← Back home
            </Link>
          </div>
        </InView>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-4">
          <div>
            <h3 className="text-sm font-medium mb-2 text-neutral-800 dark:text-neutral-300">Project Type</h3>
            <Select value={projectType} onValueChange={handleProjectTypeChange}>
              <SelectTrigger className="w-full bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-300">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="dark:bg-neutral-900 dark:border-neutral-800">
                <SelectGroup>
                  <SelectLabel className="dark:text-neutral-400">Project Type</SelectLabel>
                  <SelectItem value="all" className="dark:text-neutral-300">All Projects</SelectItem>
                  <SelectItem value="featured" className="dark:text-neutral-300">Featured</SelectItem>
                  <SelectItem value="openSource" className="dark:text-neutral-300">Open Source</SelectItem>
                  <SelectItem value="projects" className="dark:text-neutral-300">Personal Projects</SelectItem>
                  <SelectItem value="clients" className="dark:text-neutral-300">Clients</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-medium mb-2 text-neutral-800 dark:text-neutral-300">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map(tech => {
                const isAvailable = getAvailableTechnologies(selectedTechnologies).includes(tech);
                return (
                  <TechBadge
                    key={tech}
                    tech={tech}
                    onClick={isAvailable ? () => toggleTechnology(tech) : undefined}
                    selected={selectedTechnologies.includes(tech)}
                    disabled={!isAvailable && !selectedTechnologies.includes(tech)}
                  />
                );
              })}
            </div>
          </div>


        </div>

        {filteredAndSortedProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="dark:text-neutral-400">
              No projects found matching the selected filters.
              {selectedTechnologies.length > 0 && (
                <span className="block mt-2 text-sm">
                  Selected tags: {selectedTechnologies.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ')}
                </span>
              )}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedProjects.map((project, index) => (
              <InView key={project.name}>
                <div
                  className="block bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-700 transition-colors"
                  onMouseEnter={() => {
                    if (project.hoverVideo && videoRefs.current[index]) {
                      videoRefs.current[index]!.style.display = 'block';
                      videoRefs.current[index]!.play();
                    }
                  }}
                  onMouseLeave={() => {
                    if (project.hoverVideo && videoRefs.current[index]) {
                      videoRefs.current[index]!.style.display = 'none';
                      videoRefs.current[index]!.pause();
                    }
                  }}
                >
                  <div className="relative h-[15rem]">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover"
                    />
                    {project.hoverVideo && (
                      <video
                        ref={el => videoRefs.current[index] = el}
                        src={project.hoverVideo}
                        className="absolute inset-0 w-full h-full object-cover hidden"
                        muted
                        playsInline
                      />
                    )}
                  </div>
                  <div className="p-4 group">
                    <div className="relative gap-4 flex h-[30px]">
                      <div className="absolute inset-0 flex items-center gap-2 justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-5 transition-all duration-200">
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(project.link, '_blank');
                          }}
                          className="flex-1 h-12 dark:bg-neutral-900 dark:text-neutral-400 border dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        >
                          <Globe className="w-4 h-4 mr-2" />
                          Demo
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={(e) => {
                            e.preventDefault();
                            project.repo && window.open(project.repo, '_blank');
                          }}
                          disabled={!project.repo}
                          className="flex-1 h-12 dark:bg-neutral-900 dark:text-neutral-400 border dark:border-neutral-800 disabled:opacity-50 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Source
                        </Button>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-between group-hover:opacity-0 group-hover:translate-y-10 group-hover:display-none transition-all duration-200">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-medium dark:text-neutral-200">
                            {project.name}
                          </h3>
                          <Link href={project.link} className="text-sm dark:text-neutral-400">
                            <Link2 className="w-4 h-4" />
                          </Link>
                        </div>
                        <div className="flex items-center gap-2">
                          {project.tags.includes("featured") && (
                            <span className="px-2 py-1 text-xs dark:bg-neutral-900 dark:text-neutral-400 border dark:border-neutral-800">
                              Featured
                            </span>
                          )}
                          {project.tags.includes("openSource") && (
                            <span className="px-2 py-1 text-xs dark:bg-neutral-900 dark:text-neutral-400 border dark:border-neutral-800">
                              Open Source
                            </span>
                          )}
                          {project.tags.includes("projects") && (
                            <span className="px-2 py-1 text-xs dark:bg-neutral-900 dark:text-neutral-400 border dark:border-neutral-800">
                              Projects
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm dark:text-neutral-400 mb-4 group-hover:opacity-0 group-hover:translate-y-10 group-hover:display-none transition-all duration-200">
                      {project.description}
                    </p>
                    <TechBadgeList technologies={project.technologies} />
                  </div>
                </div>
              </InView>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 