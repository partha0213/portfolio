import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, AlertCircle } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  year: string;
  badgeColor: string;
  tags: string[];
  githubUrl: string;
}

// Fallback projects for when data is loading or failed
const fallbackProjects: Project[] = [
  {
    id: 1,
    title: "Green-Farm: AI-Powered Agricultural Marketplace",
    description: "An innovative marketplace that uses AI-based crop quality analysis through image recognition, with blockchain-secured transactions and UPI payment integration.",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    year: "2025",
    badgeColor: "bg-green-500",
    tags: ["AI", "Blockchain", "Image Recognition", "UPI Integration"],
    githubUrl: "https://github.com/"
  },
  {
    id: 2,
    title: "Early Diagnosis of Pneumonia Using ML",
    description: "An AI-driven medical diagnostic tool that leverages machine learning algorithms to detect pneumonia from chest X-ray images with high accuracy.",
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    year: "2024",
    badgeColor: "bg-blue-500",
    tags: ["Machine Learning", "Healthcare", "Python", "TensorFlow"],
    githubUrl: "https://github.com/"
  },
  {
    id: 3,
    title: "Marine Environment Restoration Project",
    description: "A MERN stack-based web application focused on raising awareness and facilitating conservation efforts for marine environments.",
    image: "https://images.unsplash.com/photo-1518399681073-2dee15cf2b2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    year: "2024",
    badgeColor: "bg-blue-500",
    tags: ["MERN Stack", "Conservation", "React", "MongoDB"],
    githubUrl: "https://github.com/"
  },
  {
    id: 4,
    title: "Online Social Media Communication Analytics",
    description: "A data analytics platform that provides insights for social media engagement and marketing strategies through advanced algorithms.",
    image: "https://images.unsplash.com/photo-1568952433726-3896e3881c65?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    year: "2023",
    badgeColor: "bg-purple-500",
    tags: ["Data Analytics", "Social Media", "JavaScript", "Firebase"],
    githubUrl: "https://github.com/"
  }
];

export function ProjectsSection() {
  const queryClient = useQueryClient();
  const [showAllProjects, setShowAllProjects] = useState(false);
  
  // Fetch projects from the API
  const { data: projects, isLoading, isError } = useQuery({
    queryKey: ['/api/projects'],
    queryFn: async () => {
      const response = await fetch('/api/projects');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      return response.json() as Promise<Project[]>;
    },
    // If there are no projects in the database yet, use the fallback projects
    enabled: true,
  });

  // Get the projects to display based on current state
  const displayProjects = isLoading || isError 
    ? fallbackProjects 
    : projects && projects.length > 0 
      ? showAllProjects 
        ? projects 
        : projects.slice(0, 4) // Show only the first 4 if not showing all
      : fallbackProjects;

  // Handle toggle view all projects
  const handleViewAllProjects = () => {
    setShowAllProjects(!showAllProjects);
  };

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A showcase of my recent work in AI, machine learning, and full-stack development.
          </p>
        </motion.div>
        
        {isError && (
          <div className="text-center mb-10 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-red-600 dark:text-red-400">
              There was an error loading the projects. Using fallback data instead.
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full transition-all hover:-translate-y-2 hover:shadow-xl duration-300">
                <div className="relative h-48 md:h-60">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-4 right-4 ${project.badgeColor} text-white text-xs font-bold px-2 py-1 rounded`}>
                    {project.year}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="bg-opacity-10">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <Button variant="link" className="text-primary gap-1" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <span>View on GitHub</span>
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {(projects && projects.length > 4) && (
          <div className="text-center mt-12">
            <Button className="gap-2" size="lg" onClick={handleViewAllProjects}>
              {showAllProjects ? "Show Less" : "View All Projects"}
              <ArrowRight className={`h-5 w-5 ${showAllProjects ? "rotate-90" : ""}`} />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
