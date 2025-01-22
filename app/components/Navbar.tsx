// import Link from 'next/link';
// import styles from '../../styles/navbar.module.css';

// interface NavbarProps {
//       image?: string;
//   }

// export default function Navbar({image}:NavbarProps) {
//   return (
//     <nav className={styles.navbar}>
//         <img src={image} alt="logo" width={100} height={50} />
//       <Link href="/">Home</Link>
//       <Link href="/about">About</Link>
//       <Link href="/projects">Projects</Link>
//       <Link href="/contact">Contact</Link>
//     </nav>
//   );
// }
"use client";
import Link from 'next/link';
import { useState } from 'react';
import styles from '../../styles/navbar.module.css';

interface NavbarProps {
  image?: string;
}

export default function Navbar({ image }: NavbarProps) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <img src={image} alt="Logo" width={100} height={50} />
      <div className={styles.hamburger} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={`${styles.navbarLinks} ${isMobileMenuOpen ? styles.navbarMobileMenu : ''}`}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}
