"use client";

import React, { useEffect, useState } from 'react';
import SkillBox from '../components/SkillBox';
import styles from '../../styles/skills.module.css';
import { getSkillsRes } from '@/helper';

interface Skill {
  logo: {
    url: string;
  };
  skill_name: string;
  level: string;
}

const SkillsPage: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);

  // Function to fetch skills data
  async function getSkillsInfo() {
    try {
      const res = await getSkillsRes("/skills");
    //   console.log("Skills fetched:", res.page_components[0].skills.skill_set);
      setSkills(res.page_components[0].skills.skill_set);
    } catch (err) {
      console.error('Error fetching skills data:', err);
    }
  }

  useEffect(() => {
    getSkillsInfo();
  }, []);

  return (
    <div className={styles.skillsPage}>
      <h1 className={styles.pageTitle}>My Skills</h1>
      <div className={styles.skillsGrid}>
        {skills.map((skill, index) => (
          <SkillBox
            key={index}
            icon={skill.logo.url}
            name={skill.skill_name}
            level={skill.level}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillsPage;
