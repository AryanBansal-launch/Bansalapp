import styles from "../../styles/about.module.css";
import Link from "next/link";
import { getAboutRes } from "@/helper";

interface Education {
  qualification_name: string;
  institution_name: string;
  start_date: string;
  end_date: string;
}

interface Certification {
  certification_name: string;
  certifying_body_name: string;
  domain_technology_of_certification: string;
  date_of_certification: string;
  link_of_certificate: { href: string };
}

interface Experience {
  designation: string;
  company: string;
  department: string;
  start_date: string;
  end_date: string | null;
}

interface AboutPageProps {
  greeting_text: string;
  description_about_me: string;
  education: Education[];
  certifications: Certification[];
  experiences: Experience[];
}

export default async function About() {
  let aboutData: AboutPageProps | null = null;

  try {
    const res = await getAboutRes("/about");
    aboutData = res.page_components[0].about_page as unknown as AboutPageProps;
  } catch (err) {
    console.error("Error fetching about page data:", err);
  }

  if (!aboutData) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const { description_about_me, education, certifications, experiences } = aboutData;

  return (
    <div className={styles.container} style={{ paddingTop: "120px" }}>
      <div className={styles.hero}>
        <h1 className={styles.heading}>About Me</h1>
        <p className={styles.description}>{description_about_me}</p>
      </div>

      {/* Education Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Education</h2>
        <div className={styles.cardContainer}>
          {education.map((edu, index) => (
            <div className={styles.card} key={index}>
              <h3 className={styles.cardTitle}>{edu.qualification_name}</h3>
              <p className={styles.cardText}>{edu.institution_name}</p>
              <p className={styles.cardSubText}>
                {edu.start_date} - {edu.end_date}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Certifications</h2>
        <div className={styles.cardContainer}>
          {certifications.map((cert, index) => (
            <div className={styles.card} key={index}>
              <h3 className={styles.cardTitle}>{cert.certification_name}</h3>
              <p className={styles.cardText}>{cert.certifying_body_name}</p>
              <p className={styles.cardSubText}>
                {cert.domain_technology_of_certification}
              </p>
              <button className={styles.button}>
                <Link
                  href={cert.link_of_certificate.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Certificate
                </Link>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Experience</h2>
        <div className={styles.cardContainer}>
          {experiences.map((exp, index) => (
            <div className={styles.card} key={index}>
              <h3
                className={styles.cardTitle}
                dangerouslySetInnerHTML={{ __html: exp.designation }}
              />
              <p className={styles.cardText}>{exp.company}</p>
              <p className={styles.cardText}>{exp.department}</p>
              <p className={styles.cardSubText}>
                {exp.start_date} - {exp.end_date ? exp.end_date : "Present"}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
