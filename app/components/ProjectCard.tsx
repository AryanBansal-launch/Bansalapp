import styles from '../../styles/projectcard.module.css';
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  codelink: string;
  demolink: string;
  detailink:string;
}

export default function ProjectCard({ title, description, image, codelink, demolink ,detailink}: ProjectCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={image} alt={`${title} project image`} width={400} height={300} />
      </div>
      <div className={styles.content}>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className={styles.links}>
          <a href={codelink} target="_blank" rel="noreferrer">
            {/* <img src="/github.svg" alt="GitHub" width={20} height={20} /> */}
            <button className={styles.button}>Code</button>
          </a>
          <a href={demolink} target="_blank" rel="noreferrer">
            {/* <img src="/netlify.svg" alt="Netlify" width={20} height={20} /> */}
            <button className={styles.button}>Live</button>
          </a>
          <Link href={detailink}>
            {/* <img src="/netlify.svg" alt="Netlify" width={20} height={20} /> */}
            <button className={styles.button}>Detail</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
