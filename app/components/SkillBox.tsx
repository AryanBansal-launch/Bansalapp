import React from 'react';
import styles from '../../styles/skillBox.module.css';

interface SkillBoxProps {
  icon: string; // URL for the skill icon
  name: string;
  level: string; // Skill level (e.g., Beginner, Intermediate, Expert)
}

const SkillBox: React.FC<SkillBoxProps> = ({ icon, name, level }) => {
  return (
    <div className={styles.skillCircle}>
      <img src={icon} alt={`${name} icon`} className={styles.skillIcon} />
      <h3 className={styles.skillName}>{name}</h3>
      <p className={styles.skillLevel}>{level}</p>
    </div>
  );
};

export default SkillBox;
