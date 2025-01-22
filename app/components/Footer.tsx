import styles from '../../styles/footer.module.css';
import Link from 'next/link';

interface FooterProps {
    Navlink: string;
    sociallink?: string;
    logo?: string;
  }

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <img src="/logo.svg" alt="Logo" />
        </div>

        {/* Navigation Links */}
        <div className={styles.navLinks}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* Social Links */}
        <div className={styles.socialLinks}>
          <Link href="https://github.com" passHref>
            <img src="/github.svg" alt="GitHub" />
          </Link>
          <Link href="https://linkedin.com" passHref>
            <img src="/linkedin.svg" alt="LinkedIn" />
          </Link>
          <Link href="https://twitter.com" passHref>
            <img src="/twitter.svg" alt="Twitter" />
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <p className={styles.copyright}>
        © {new Date().getFullYear()} Your Name. All rights reserved.
      </p>
    </footer>
  );
}
