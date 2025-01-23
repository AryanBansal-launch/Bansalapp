// import ProjectCard from '../components/ProjectCard';
// import styles from '../../styles/projects.module.css';

// export default function Projects() {
//   return (
//     <div className={styles.main}>
//       <h1 className='h1'>My Projects</h1>
//       <div className={styles.grid}>
//         <ProjectCard title="Project 1" description="Description of Project 1" image="sample.png" demolink="samplelink" codelink="codelink"/>
//         <ProjectCard title="Project 2" description="Description of Project 2" image="sample.png" demolink="samplelink" codelink="codelink"/>
//         <ProjectCard title="Project 3" description="Description of Project 3" image="sample.png" demolink="samplelink" codelink="codelink"/>
//       </div>
//     </div>
//   );
// }

'use client';

import styles from '../../styles/projects.module.css';
import ProjectCard from '../components/ProjectCard';
import { getProjectsRes } from '@/helper'; // Assuming getProjectsRes fetches data
import { useState, useEffect } from 'react';

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
        {projectData.map((project, index) => (
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
