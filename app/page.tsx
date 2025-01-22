import styles from '../styles/home.module.css';

export default function Home() {
  return (
    <div className={styles.banner}>
      <div className={styles.overlay}>
        <h1 className={styles.title}>Welcome to My Portfolio</h1>
        <p className={styles.description}>
          Hi, I'm [Your Name], a [Your Profession]. Passionate about crafting
          exceptional user experiences.
        </p>
        <a href="https://contentstack.learnupon.com/enrollments/245240985/page/935307175" target="_blank" rel="noopener noreferrer">
          <button className={styles.resumeButton}>View Resume</button>
        </a>
      </div>
    </div>
  );
}
