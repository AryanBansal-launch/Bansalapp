'use client';
import React, { useState, useEffect} from 'react';
import { useParams } from 'next/navigation';
import styles from '../../../styles/projectdetail.module.css';
import Link from "next/link";
import { getProjectDetail } from "@/helper";

interface Link {
  href: string;
}

interface ProjectDetail {
  project_title: string;
  project_description: string;
  thumbnail_image: { url: string };
  links_group: {
    codelink: Link;
    live_project: Link;
  };
}

const Page = () => {
  const { projectId } = useParams(); 
  const [projectData, setProjectData] = useState<ProjectDetail | null>(null);
  const [imagePath, setImagePath] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProjectData() {
      try {
        setIsLoading(true);
        const response = await getProjectDetail(`/projects/${projectId}`);
        console.log("Specific project data:", response);
        console.log("Specific image url:", response.thumbnail_image.permanent_url);
        const imagePathURL = new URL(response.thumbnail_image.permanent_url);
        const imagePath = imagePathURL.pathname;
        console.log("Image path:", imagePath);
        setImagePath(imagePath);
        setProjectData(response);
      } catch (error) {
        console.error("Error fetching project data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjectData();
  }, [projectId]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading project details...</p>
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className={styles.errorContainer}>
        <h2>Project Not Found</h2>
        <p>Sorry, the project you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/projects" className={styles.backLink}>
          ← Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.projectDetailPage}>
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          <Link href="/projects" className={styles.backButton}>
            ← Back to Projects
          </Link>
          <h1 className={styles.projectTitle}>{projectData.project_title}</h1>
        </div>

        {/* Main Content */}
        <div className={styles.content}>
          {/* Image Section */}
          {projectData.thumbnail_image && (
            <div className={styles.imageSection}>
              <img
                src={imagePath}
                alt={projectData.project_title}
                className={styles.thumbnail}
              />
            </div>
          )}

          {/* Description Section */}
          <div className={styles.descriptionSection}>
            <h2 className={styles.sectionTitle}>About This Project</h2>
            <div 
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: projectData.project_description }}
            />
          </div>

          {/* Links Section */}
          <div className={styles.linksSection}>
            <h2 className={styles.sectionTitle}>Project Links</h2>
            <div className={styles.links}>
              <Link 
                href={projectData.links_group.codelink.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.link}
              >
                <span className={styles.linkIcon}>💻</span>
                View Code
              </Link>
              <Link 
                href={projectData.links_group.live_project.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.link}
              >
                <span className={styles.linkIcon}>🌐</span>
                View Live Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
