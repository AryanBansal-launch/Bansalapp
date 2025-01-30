// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation"; // Import usePathname hook
// import { useState, useEffect } from "react";
// import styles from "../../styles/navbar.module.css";
// import { getHeaderRes } from "@/helper";
// import { HeaderProps } from "@/typescript/layout";

// interface NavbarProps {
//   image?: string;
// }

// export default function Navbar({ image }: NavbarProps) {
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [data, setData] = useState<HeaderProps | null>(null);
//   const pathname = usePathname(); // Get the current pathname

//   // Fetch header information
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
//   }, []);

//   return (
//     <nav className={styles.navbar}>
//       {/* Logo */}
//       <Link href="/">
//         <img
//           src={image || (data?.logo?.url ?? "/default-logo.png")}
//           alt="Logo"
//           width={50}
//           height={50}
//         />
//       </Link>

//       {/* Hamburger Menu Icon for Mobile */}
//       <div
//         className={styles.hamburger}
//         onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
//       >
//         <div></div>
//         <div></div>
//         <div></div>
//       </div>

//       {/* Navigation Links */}
//       <div
//         className={`${styles.navbarLinks} ${
//           isMobileMenuOpen ? styles.navbarMobileMenu : ""
//         }`}
//       >
//         {data?.navigation_menu?.map((menuItem, index) => {
//           const isActive = pathname === menuItem.page_reference[0].url; // Check if the current path matches the menu item URL
//           return (
//             <Link
//               key={index}
//               href={menuItem.page_reference[0].url}
//               className={isActive ? styles.activeLink : ""} // Conditionally apply the active class
//             >
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
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
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
      </div>
    </nav>
  );
}
