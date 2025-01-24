'use client';
import React from 'react';
import { gethomeRes } from '@/helper';
import { useEffect, useState } from 'react';
import styles from '../styles/home.module.css';

interface HomeProps {
  banner_image: { url: string };
  background_video: { url: string };
  portfolio_person_name: string;
  portfolio_person_designation: string;
  banner_title: string;
  banner_description: string;
  go_to_resume: { href: string };
}

export default function Home() {
  const [homeData, setHomeData] = useState<HomeProps | null>(null);

  useEffect(() => {
    async function fetchHomeData() {
      try {
        const response = await gethomeRes('/');
        const data = await response.page_components[0].aryan_banner;
        console.log('Home Data frontend:', data);
        setHomeData(data);
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    }

    fetchHomeData();
  }, []);

  if (!homeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.banner}>
      <div className={styles.videoWrapper}>
        <video
          className={styles.backgroundVideo}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={homeData.background_video.url} type="video/mp4" />
          Sorry, your browser does not support embedded videos.
        </video>
      </div>
      <div className={styles.overlay}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{homeData.banner_title}</h1>
          <p className={styles.description}>{homeData.banner_description}</p>
          <a href={homeData.go_to_resume.href} target="_blank" rel="noopener noreferrer">
            <button className={styles.resumeButton}>View Resume</button>
          </a>
        </div>
        <div className={styles.imageContainer}>
          <img
            src={homeData.banner_image.url}
            alt="Portfolio Banner"
            className={styles.profileImage}
          />
        </div>
      </div>
    </div>
  );
}

