'use client';

import { useState,useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../styles/skills.module.css';
import * as contentstack from '@contentstack/management'

interface MyAsset {
  uid: string;
  url: string;
  title: string;
  description: string;
}

export default function SessionCheck() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [skillName, setSkillName] = useState('');
  const [skillLevel, setSkillLevel] = useState('Beginner');
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [asset,setAsset]=useState<MyAsset|null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (skillName.trim() !== '' && skillLevel !== '' && iconFile !== null) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [skillName, skillLevel, iconFile]);
  
  if (!session) return null;

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    setIconFile(file);
    setIconPreview(URL.createObjectURL(file)); 
  
    try {
      const formData = new FormData();
      formData.append("asset[upload]", file); 
      formData.append("asset[title]", skillName);
      formData.append("asset[description]", "Skill Icon");
  
      // Make the request to upload the asset
      const response = await fetch(
        `https://api.contentstack.io/v3/assets`,
        {
          method: "POST",
          headers: {
            Authorization: process.env.NEXT_PUBLIC_CONTENTSTACK_MANAGEMENT_TOKEN as string,
            api_key: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string,
          },
          body: formData,
        }
      );
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Uploaded Asset:", data);
        setAsset(data.asset); 
        toast.success("File uploaded successfully!");
        await publishasset(data.asset); 
      } else {
        console.error("Upload failed:", data);
        toast.error("Upload failed!");
      }
    } catch (error) {
      console.error("Error uploading asset:", error);
      toast.error("Error uploading file.");
    }
  };
  
  //publish asset function
  const publishasset = async (asset:MyAsset) => {
    if (!asset || !asset.uid) {
      console.error("Asset UID is not available");
      return;
    }
  
    const client = contentstack.client();
    const assetobj = {
      locales: ["en-us"],
      environments: ["development"],
    };
  
    client.stack({ api_key: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string, management_token: process.env.NEXT_PUBLIC_CONTENTSTACK_MANAGEMENT_TOKEN as string })
      .asset(asset.uid) 
      .publish({ publishDetails: assetobj, locale: "en-us" })
      .then((response) => {
        console.log(response.notice);
        toast.success("Asset published successfully!");
      })
      .catch((error) => console.error("Error publishing asset:", error));
  };
  

  //publish entry function
  const publishentry = async () => {
    const client = contentstack.client();
    const entry = {
    "locales": [
                "en-us"
                ],
      "environments": [
                  "development"
                  ]
    }
    client.stack({ api_key: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string, management_token: process.env.NEXT_PUBLIC_CONTENTSTACK_MANAGEMENT_TOKEN as string })
    .contentType('common_page').entry('blt3c15dff86ebb6b6f')
    .publish({ publishDetails: entry, locale: "en-us"})
    .then((response) => console.log(response.notice))
    .catch((error) => console.error(error))
   }
  
   //logic to handle the addition of skill in the  entry
  const handleAddSkill = async () => {
    if (!iconFile) {
      toast.error("Please upload an icon before adding the skill!");
      return;
    }
    console.log('New Skill:', { skillName, skillLevel, iconFile });
    const client = contentstack.client();
    client.stack({ 
      api_key: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string, 
      management_token: process.env.NEXT_PUBLIC_CONTENTSTACK_MANAGEMENT_TOKEN 
    }).contentType('common_page').entry('blt3c15dff86ebb6b6f')
    .fetch()
    .then((entry) => {
    entry.page_components[0].skills.skill_set.push({
      skill_name: skillName,
      level: skillLevel,
      logo:asset
    })
    return entry.update()
    })
    .then((entry) => console.log("the entry updated:",entry.page_components[0].skills.skill_set)).then(publishentry).then(() => toast.success("Skill added successfully!"))
    .catch((error) => console.error(error))
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
            <input
              type="text"
              placeholder="Skill Name"
              className={styles.inputField}
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
            />
            <label className={styles.uploadLabel}>
              Upload Icon
              <input type="file" accept="image/*" className={styles.uploadInput} onChange={handleFileChange} />
            </label>
            
            {iconPreview && <img src={iconPreview} alt="Icon Preview" className={styles.iconPreview} />}
            <select
              className={styles.selectField}
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <button
            className={styles.addButton}
            onClick={handleAddSkill}
            disabled={!isFormValid} // Disable button when form is incomplete
            style={{ opacity: isFormValid ? 1 : 0.5, cursor: isFormValid ? 'pointer' : 'not-allowed' }} 
          >
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


