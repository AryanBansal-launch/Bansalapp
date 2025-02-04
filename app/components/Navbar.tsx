
// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import styles from "../../styles/navbar.module.css";
// import { getHeaderRes } from "@/helper";
// import { HeaderProps } from "@/typescript/layout";
// // import SignIn from "./sign-in";

// interface NavbarProps {
//   image?: string;
// }

// export default function Navbar({ image }: NavbarProps) {
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [data, setData] = useState<HeaderProps | null>(null);
//   const [scrolled, setScrolled] = useState(false);
//   const pathname = usePathname();

//   async function getHeaderInfo() {
//     try {
//       const res = await getHeaderRes();
//       setData(res);
//     } catch (err) {
//       console.error("Error fetching header data:", err);
//     }
//   }

//   useEffect(() => {
//     getHeaderInfo();

//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setScrolled(true);
//       } else {
//         setScrolled(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
//       <Link href="/">
//         <img
//           src={image || (data?.logo?.url ?? "/default-logo.png")}
//           alt="Logo"
//           width={50}
//           height={50}
//         />
//       </Link>

//       <div className={styles.hamburger} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
//         <div></div>
//         <div></div>
//         <div></div>
//       </div>

//       <div className={`${styles.navbarLinks} ${isMobileMenuOpen ? styles.navbarMobileMenu : ""}`}>
//         {data?.navigation_menu?.map((menuItem, index) => {
//           const isActive = pathname === menuItem.page_reference[0].url;
//           return (
//             <Link key={index} href={menuItem.page_reference[0].url} className={isActive ? styles.activeLink : ""}>
//               {menuItem.label}
//             </Link>
//           );
//         })}
//       </div>
//     </nav>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut } from "next-auth/react"; // ✅ Import authentication functions
import { useSession } from "next-auth/react"; // ✅ Import useSession hook
import styles from "../../styles/navbar.module.css";
import { getHeaderRes } from "@/helper";
import { HeaderProps } from "@/typescript/layout";

interface NavbarProps {
  image?: string;
}

export default function Navbar({ image }: NavbarProps) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [data, setData] = useState<HeaderProps | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession(); // ✅ Get session data in client

  async function getHeaderInfo() {
    try {
      const res = await getHeaderRes();
      setData(res);
    } catch (err) {
      console.error("Error fetching header data:", err);
    }
  }

  useEffect(() => {
    getHeaderInfo();

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <Link href="/">
        <img
          src={image || (data?.logo?.url ?? "/default-logo.png")}
          alt="Logo"
          width={50}
          height={50}
        />
      </Link>

      <div className={styles.hamburger} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className={`${styles.navbarLinks} ${isMobileMenuOpen ? styles.navbarMobileMenu : ""}`}>
        {data?.navigation_menu?.map((menuItem, index) => {
          const isActive = pathname === menuItem.page_reference[0].url;
          return (
            <Link key={index} href={menuItem.page_reference[0].url} className={isActive ? styles.activeLink : ""}>
              {menuItem.label}
            </Link>
          );
        })}

        {/* ✅ Authentication Buttons */}
        {session ? (
          <button className={styles.authButton} onClick={() => signOut()}>Sign Out</button>
        ) : (
          <button className={styles.authButton} onClick={() => signIn("github")}>Admin SignIn</button>
        )}
      </div>
    </nav>
  );
}
