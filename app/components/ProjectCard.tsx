import styles from '../../styles/projectcard.module.css';

interface ProjectCardProps {
  title: string;
  description: string;
  codelink?: string;
    demolink?: string;
    image?: string;
}

export default function ProjectCard({ title, description,image,demolink,codelink }: ProjectCardProps) {
  return (
    <div className={styles.card}>
        <div className={styles.image}>
            <img src={image} alt="project image" width={400} height={300} />
        </div>
        <div className={styles.content}>
            <h2>{title}</h2>
            <p>{description}</p>
            <div className={styles.links}>
                <a href={codelink} target="_blank" rel="noreferrer">
                    <img src="/github.svg" alt="github" width={20} height={20} />
                </a>
                <a href={demolink} target="_blank" rel="noreferrer">
                    <img src="/netlify.svg" alt="netlify" width={20} height={20} />
                </a>
            </div>
            </div>
        </div>
  );
}
