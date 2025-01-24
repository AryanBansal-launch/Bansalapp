
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from '../../styles/navbar.module.css';
import { getHeaderRes } from '@/helper';
import { HeaderProps } from '@/typescript/layout';

interface NavbarProps {
  image?: string;
}

export default function Navbar({ image }: NavbarProps) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [data, setData] = useState<HeaderProps | null>(null);

  // Fetch header information
  async function getHeaderInfo() {
    try {
      const res = await getHeaderRes();
      setData(res);
    } catch (err) {
      console.error('Error fetching header data:', err);
    }
  }

  useEffect(() => {
    getHeaderInfo();
  }, []);

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <Link href="/">
      <img
        src={image || (data?.logo?.url ?? '/default-logo.png')}
        alt="Logo"
        width={50}
        height={50}
      />
      </Link>

      {/* Hamburger Menu Icon for Mobile */}
      <div
        className={styles.hamburger}
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Navigation Links */}
      <div
        className={`${styles.navbarLinks} ${
          isMobileMenuOpen ? styles.navbarMobileMenu : ''
        }`}
      >
        {data?.navigation_menu?.map((menuItem, index) => (
          <Link key={index} href={menuItem.page_reference[0].url}>
            {menuItem.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

