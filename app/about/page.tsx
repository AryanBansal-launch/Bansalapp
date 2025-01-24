"use client";

import { useState, useEffect } from "react";
import styles from "../../styles/about.module.css";
import Link from "next/link";
import { getAboutRes } from "@/helper"; // Helper to fetch About page data

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
  link_of_certificate: string;
}

interface Experience {
  designation: string;
  company: string;
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

export default function About() {
  const [aboutData, setAboutData] = useState<AboutPageProps | null>(null);

  async function fetchAboutData() {
    try {
      const res = await getAboutRes("/about");
      console.log("About Page Data:", res.page_components[0].about_page);
      setAboutData(res.page_components[0].about_page as unknown as AboutPageProps);
    } catch (err) {
      console.error("Error fetching about page data:", err);
    }
  }

  useEffect(() => {
    fetchAboutData();
  }, []);

  if (!aboutData) {
    return <div>Loading...</div>;
  }

  const {
    greeting_text,
    description_about_me,
    education,
    certifications,
    experiences,
  } = aboutData;

  return (
    <div className={styles.main}>
      {/* Greeting Section */}
      <h1 className="h1">Welcome to My Portfolio</h1>
      <section className={styles.greetingSection}>
        <div dangerouslySetInnerHTML={{ __html: greeting_text }} />
      </section>

      {/* About Description Section */}
      <section className={styles.aboutSection}>
        <h2 className="h2">About Me</h2>
        <p>{description_about_me}</p>
      </section>

      {/* Education Section */}
      <section className={styles.educationSection}>
        <h2 className="h2">Education</h2>
        {education.map((edu, index) => (
          <div className={styles.educationBox} key={index}>
            <h3>{edu.qualification_name}</h3>
            <p>{edu.institution_name}</p>
            <p>Start Date: {edu.start_date}</p>
            <p>End Date: {edu.end_date}</p>
          </div>
        ))}
      </section>

      {/* Certifications Section */}
      <section className={styles.certificationsSection}>
        <h2 className="h2">Certifications</h2>
        {certifications.map((cert, index) => (
          <div className={styles.certificationBox} key={index}>
            <h3>{cert.certification_name}</h3>
            <p>Certifying Authority: {cert.certifying_body_name}</p>
            <p>Domain: {cert.domain_technology_of_certification}</p>
            <p>Date of Certification: {cert.date_of_certification}</p>
            <Link
              className="a"
              href={cert.link_of_certificate}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Certificate
            </Link>
          </div>
        ))}
      </section>

      {/* Experience Section */}
      <section className={styles.experienceSection}>
        <h2 className="h2">Experience</h2>
        {experiences.map((exp, index) => (
          <div className={styles.experienceBox} key={index}>
            <h3 dangerouslySetInnerHTML={{ __html: exp.designation }} />
            <p>Company: {exp.company}</p>
            <p>Start Date: {exp.start_date}</p>
            <p>
              End Date: {exp.end_date ? exp.end_date : "Present"}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
