import ProjectCard from '../components/ProjectCard';
import styles from '../../styles/projects.module.css';

export default function Projects() {
  return (
    <div className={styles.main}>
      <h1>My Projects</h1>
      <div className={styles.grid}>
        <ProjectCard title="Project 1" description="Description of Project 1" />
        <ProjectCard title="Project 2" description="Description of Project 2" />
        <ProjectCard title="Project 3" description="Description of Project 3" />
      </div>
    </div>
  );
}
