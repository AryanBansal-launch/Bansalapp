// "use client";
// import styles from "../../../styles/error.module.css";
// import { useSearchParams } from "next/navigation";

// export default function AuthErrorPage() {
//   const searchParams = useSearchParams();
//   const error = searchParams.get("error");

//   return (
//     <div style={{ textAlign: "center", padding: "50px",marginTop:"100px" }}>
//       <h1>Authentication Failed</h1>
//       <p>{`${error}: Only Admin is allowed to Sign In!`}</p>
//       <button className={styles.backButton} onClick={() => window.location.href = "/"}>Go Back</button>
//     </div>
//   );
// }
"use client";
import styles from "../../../styles/error.module.css";
import { useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "Access Denied";

  return (
    <div className={styles.errorContainer}>
      <h1 className={styles.errorHeading}>Authentication Failed</h1>
      <p className={styles.errorMessage}>{`${error}: Only Admin is allowed to Sign In!`}</p>
      <button
        className={styles.backButton}
        onClick={() => (window.location.href = "/")}
      >
        Go Back
      </button>
    </div>
  );
}
