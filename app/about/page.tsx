import styles from '../../styles/about.module.css';
import Link from 'next/link';

export default function About() {
  return (
    <div className={styles.main}>
      {/* Greeting Section */}
      <h1 className="h1">Welcome to My Portfolio</h1>

      {/* About Description Section */}
      <section className={styles.aboutSection}>
        <h2 className="h2">About Me</h2>
        <p>This is where you describe yourself and your journey.</p>
      </section>

      {/* Education Section */}
      <section className={styles.educationSection} id="section">
        <h2 className="h2">Education</h2>
        <div className={styles.educationBox}>
          <h3>Bachelor of Science in Computer Science</h3>
          <p>University of XYZ</p>
          <p>Start Date: September 2015</p>
          <p>End Date: May 2019</p>
        </div>
        <div className={styles.educationBox}>
          <h3>Master of Science in Data Science</h3>
          <p>Institute of ABC</p>
          <p>Start Date: September 2019</p>
          <p>End Date: May 2021</p>
        </div>
      </section>

      {/* Certifications Section */}
      <section className={styles.certificationsSection} id="section">
        <h2 className="h2">Certifications</h2>
        <div className={styles.certificationBox}>
          <h3>Certified Data Analyst</h3>
          <p>Certifying Authority: Data Institute</p>
          <p>Domain: Data Analysis</p>
          <p>Date of Certification: June 2021</p>
          <Link  className="a" href="https://example.com/certificate" target="_blank" rel="noopener noreferrer">View Certificate</Link>
        </div>
        <div className={styles.certificationBox}>
          <h3>Full Stack Developer Certification</h3>
          <p>Certifying Authority: Code Academy</p>
          <p>Domain: Web Development</p>
          <p>Date of Certification: March 2020</p>
          <Link  className="a" href="https://example.com/certificate" target="_blank" rel="noopener noreferrer">View Certificate</Link>
        </div>
      </section>

      {/* Experience Section */}
      <section className={styles.experienceSection} id="section">
        <h2 className="h2">Experience</h2>
        <div className={styles.experienceBox}>
          <h3>Software Engineer</h3>
          <p>Company: Tech Solutions</p>
          <p>Start Date: June 2021</p>
          <p>End Date: Present</p>
        </div>
        <div className={styles.experienceBox}>
          <h3>Intern</h3>
          <p>Company: DevWorks</p>
          <p>Start Date: January 2020</p>
          <p>End Date: June 2020</p>
        </div>
      </section>
    </div>
  );
}
