
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "../../styles/navbar.module.css";
import { getHeaderRes } from "@/helper";
import { HeaderProps } from "@/typescript/layout";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface NavbarProps {
  image?: string;
}

export default function Navbar({ image }: NavbarProps) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [data, setData] = useState<HeaderProps | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      await signIn("github");
    } catch (err) {
      setError("You are not authorized to sign in.");
      console.error("Error signing in:", err);
      toast.error(error);
    }
  };

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

  // Close mobile menu on navigation
  const handleNavClick = () => setMobileMenuOpen(false);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <Link href="/" onClick={handleNavClick}>
        <img
          src={image || (data?.logo?.url)}
          alt="Logo"
          width={50}
          height={50}
        />
      </Link>

      {/* Hamburger Menu */}
      <div
        className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ""}`}
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Navigation Links */}
      <div
        className={`${styles.navbarLinks} ${isMobileMenuOpen ? styles.navbarMobileMenu : ""}`}
      >
        {data?.navigation_menu?.map((menuItem, index) => {
          const isActive = pathname === menuItem.page_reference[0].url;
          return (
            <Link
              key={index}
              href={menuItem.page_reference[0].url}
              className={isActive ? styles.activeLink : ""}
              onClick={handleNavClick}
            >
              {menuItem.label}
            </Link>
          );
        })}

        {/* Authentication Buttons */}
        {session ? (
          <button className={styles.authButton} onClick={() => signOut()}>
            Sign Out
          </button>
        ) : (
          <button className={styles.authButton} onClick={handleSignIn}>
            Admin Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
