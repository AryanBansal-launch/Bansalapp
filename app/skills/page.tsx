// import SkillBox from '../components/SkillBox';
// import styles from '../../styles/skills.module.css';
// import { getSkillsRes } from '@/helper';
// // import SignIn from '../components/sign-in';

// interface Skill {
//   logo: {
//     url: string;
//   };
//   skill_name: string;
//   level: string;
// }

// export default async function SkillsPage() {
//   let skills: Skill[] = [];

//   try {
//     const res = await getSkillsRes("/skills");
//     skills = res.page_components[0].skills.skill_set as Skill[];
//   } catch (err) {
//     console.error('Error fetching skills data:', err);
//   }

//   return (
//     <div className={styles.skillsPage} style={{ paddingTop: "120px" }}>
//       <h1 className={styles.pageTitle}>Skills & Technologies</h1>
//       <div className={styles.skillsGrid}>
//         {skills.map((skill, index) => (
//           <SkillBox
//             key={index}
//             icon={skill.logo.url}
//             name={skill.skill_name}
//             level={skill.level}
//           />
//         ))}
//       </div>
//       {/* <SignIn /> */}
//     </div>
//   );
// }
import SkillBox from '../components/SkillBox';
import styles from '../../styles/skills.module.css';
import { getSkillsRes } from '@/helper';
import SessionCheck from '../components/SessionCheck';

interface Skill {
  logo: {
    url: string;
  };
  skill_name: string;
  level: string;
}

export default async function SkillsPage() {
  let skills: Skill[] = [];

  try {
    const res = await getSkillsRes("/skills");
    skills = res.page_components[0].skills.skill_set as Skill[];
  } catch (err) {
    console.error('Error fetching skills data:', err);
  }

  return (
    <div className={styles.skillsPage} style={{ paddingTop: "120px" }}>
      <h1 className={styles.pageTitle}>Skills & Technologies</h1>
      <SessionCheck />
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
}
