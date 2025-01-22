import ProjectCard from '../components/ProjectCard';
import styles from '../../styles/projects.module.css';

export default function Projects() {
  return (
    <div className={styles.main}>
      <h1 className='h1'>My Projects</h1>
      <div className={styles.grid}>
        <ProjectCard title="Project 1" description="Description of Project 1" image="sample.png" demolink="samplelink" codelink="codelink"/>
        <ProjectCard title="Project 2" description="Description of Project 2" image="sample.png" demolink="samplelink" codelink="codelink"/>
        <ProjectCard title="Project 3" description="Description of Project 3" image="sample.png" demolink="samplelink" codelink="codelink"/>
      </div>
    </div>
  );
}
