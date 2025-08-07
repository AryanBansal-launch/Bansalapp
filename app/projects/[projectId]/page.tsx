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
  const [imagePath, setImagePath] = useState<string>("");//test

  useEffect(() => {
    async function fetchProjectData() {
      try {
        const response = await getProjectDetail(`/projects/${projectId}`);
        console.log("Specific project data:", response);
        console.log("Specific image url:", response.thumbnail_image.url);
        const imagePathURL = new URL(response.thumbnail_image.url);
        const imagePath = imagePathURL.pathname;
        console.log("Image path:", imagePath);
        setImagePath(imagePath);
        setProjectData(response);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    }

    fetchProjectData();
  }, [projectId]);

  if (!projectData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.projectDetailPage} style={{ paddingTop: "150px" }}>
        <div  className={styles.projectCard}>
          <h2 className='h1'>{projectData.project_title}</h2>
          {/* {projectData.thumbnail_image && (
            <img
              src={projectData.thumbnail_image.url}
              alt={projectData.project_title}
              className={styles.thumbnail}
            />
          )} */}
          {projectData.thumbnail_image && (
            <img
              src={imagePath}
              alt={projectData.project_title}
              className={styles.thumbnail}
            />
          )}
          <p className='p'>{projectData.project_description}</p>
          <div className={styles.links}>
            <Link href={projectData.links_group.codelink.href} target="_blank" className={styles.link}>
              View Code
            </Link>
            <Link href={projectData.links_group.live_project.href} target="_blank" className={styles.link}>
              View Live Project
            </Link>
          </div>
        </div>
    </div>
  );
};

export default Page;
