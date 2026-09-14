"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/public/ProjectCard";
import { PROJECT_FILTERS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Project = {
  title: string;
  slug: string;
  industry: string;
  projectType: string;
  status: string;
  services: string[];
  summary: string;
  coverImage?: string | null;
};

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<(typeof PROJECT_FILTERS)[number]>("All");

  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((project) =>
      project.services.some((service) => service.toLowerCase().includes(filter.toLowerCase().slice(0, -1))),
    );
  }, [filter, projects]);

  return (
    <div className="mt-12">
      <div className="flex flex-wrap gap-3">
        {PROJECT_FILTERS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={cn(
              "rounded-full border px-4 py-2 text-[0.68rem] tracking-[0.18em] uppercase",
              filter === item ? "border-gold bg-gold text-ink" : "border-gold/20 text-stone hover:text-ivory",
            )}
          >
            {item}
          </button>
        ))}
      </div>
      {filtered.length ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-stone">No published projects in this category yet.</p>
      )}
    </div>
  );
}
