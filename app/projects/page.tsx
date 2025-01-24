
'use client';

import styles from '../../styles/projects.module.css';
import ProjectCard from '../components/ProjectCard';
import { getProjectsRes } from '@/helper'; // Assuming getProjectsRes fetches data
import { useState, useEffect, Key } from 'react';

interface Link {
  href: string;
}

interface Project {
  project_title: string;
  project_description: string;
  project_thumbnail: string;
  links: {
    code_link: Link;
    deployed_project_link: Link;
  };
}

interface ProjectsProps {
  map(arg0: (project: { project_title: string; project_description: string; project_thumbnail: string; links: { code_link: { href: string; }; deployed_project_link: { href: string; }; }; }, index: Key | null | undefined) => import("react").JSX.Element): import("react").ReactNode;
  projects: Project[];
}

const Projects = () => {
  const [projectData, setprojectData] = useState<ProjectsProps | null>(null);
  useEffect(() => {
      async function fetchprojectData() {
        try {
          const response = await getProjectsRes('/projects');
          console.log("project Data:", response);
          setprojectData(response);
        } catch (error) {
          console.error("Error fetching footer data:", error);
        }
      }
      fetchprojectData();
    }, []);
  
    if (!projectData) {
      return <div>Loading...</div>;
    }
  
    // const { navigation, social, logo, copyright } = projectData;
  return (
    <div className={styles.main}>
      <h1 className="h1">My Projects</h1>
      <div className={styles.grid}>
        {projectData.map((project: { project_title: string; project_description: string; project_thumbnail: string; links: { code_link: { href: string; }; deployed_project_link: { href: string; }; }; }, index: Key | null | undefined) => (
          <ProjectCard
            key={index}
            title={project.project_title}
            description={project.project_description}
            image={project.project_thumbnail}
            codelink={project.links.code_link.href}
            demolink={project.links.deployed_project_link.href}
          />
        ))}
      </div>
    </div>
  );
};
export default Projects;
