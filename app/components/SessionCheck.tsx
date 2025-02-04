'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import styles from '../../styles/skills.module.css';

export default function SessionCheck() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [skillName, setSkillName] = useState('');
  const [skillLevel, setSkillLevel] = useState('Skill Level');
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);

  if (!session) return null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIconFile(file);
      setIconPreview(URL.createObjectURL(file)); // Generate a preview URL
    }
  };
  const handleAddSkill = async () => {
    console.log('New Skill:', { skillName, skillLevel, iconFile });

    setIsModalOpen(false);
  };

  return (
    <>
      <button className={styles.addSkillButton} onClick={() => setIsModalOpen(true)}>
        + Add Skill
      </button>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Add New Skill</h2>

            {/* Skill Name Input */}
            <input
              type="text"
              placeholder="Skill Name"
              className={styles.inputField}
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
            />

            {/* Upload Icon Input */}
            <label className={styles.uploadLabel}>
              Upload Icon
              <input type="file" accept="image/*" className={styles.uploadInput} onChange={handleFileChange} />
            </label>

            {/* Icon Preview */}
            {iconPreview && <img src={iconPreview} alt="Icon Preview" className={styles.iconPreview} />}

            {/* Skill Level Dropdown */}
            <select
              className={styles.selectField}
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            {/* Buttons */}
            <button className={styles.addButton} onClick={handleAddSkill}>
              Add Skill
            </button>
            <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
