import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPortfolioProjects, type Project } from "@/lib/firebase/actions";
import { Button } from "@/components/ui/button";

async function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex flex-col overflow-hidden group hover:shadow-primary/20 transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-headline text-xl">{project.title}</CardTitle>
        <CardDescription className="font-body text-base h-16">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg">
            <Image
            src={project.imageUrl}
            alt={project.title}
            width={800}
            height={600}
            data-ai-hint={project.imageHint}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="link" className="text-secondary font-bold p-0">
            View Project &rarr;
        </Button>
      </CardFooter>
    </Card>
  );
}

export async function ProjectShowcase() {
  const projects = await getPortfolioProjects();

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center mt-12">
        <p className="text-muted-foreground">No projects to display yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
