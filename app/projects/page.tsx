import styles from '../../styles/projects.module.css';
import ProjectCard from '../components/ProjectCard';
import { getProjectsRes } from '@/helper';

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
    detail: Link;
  };
}

export const revalidate = 0; // No caching (forces fresh fetch every request)

export default async function Projects() {
  let projectData: Project[] = []; // Correct type

  try {
    const response = await getProjectsRes('/projects'); // Fetch data
    // console.log(response);
    projectData = response || []; // Ensure response structure is correct
  } catch (error) {
    console.error("Error fetching project data:", error);
  }

  return (
    <div className={styles.main} style={{ paddingTop: "120px" }}>
      <h1 className={styles.heading}>Projects</h1>
      <div className={styles.grid}>
        {projectData.length > 0 ? (
          projectData.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.project_title}
              description={project.project_description}
              image={project.project_thumbnail}
              codelink={project.links.code_link.href}
              demolink={project.links.deployed_project_link.href}
              detailink={project.links.detail.href}
            />
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </div>
  );
}
