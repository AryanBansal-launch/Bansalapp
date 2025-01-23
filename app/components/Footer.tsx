'use client';
import styles from "../../styles/footer.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getFooter } from "@/helper";

interface NavigationLink {
  title: string;
  href: string;
}

interface SocialLink {
  title: string;
  link: {href:string};
  icon: {url:string};
}
interface Footerschema {
  navigation: NavigationLink[];
  social: SocialLink[];
  logo:{url:string};
  copyright?: string;
}

export default function Footer() {
  const [footerData, setFooterData] = useState<Footerschema | null>(null);

  useEffect(() => {
    async function fetchFooterData() {
      try {
        const response = await getFooter();
        console.log("Footer Data:", response);
        setFooterData(response);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    }
    fetchFooterData();
  }, []);

  if (!footerData) {
    return <div>Loading...</div>;
  }

  const { navigation, social, logo, copyright } = footerData;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <img src={logo.url} alt="Logo" width={50} height={50} />
        </div>

        {/* Navigation Links */}
        <div className={styles.navLinks}>
          {navigation.map((link, index) => (
            <Link href={link.href} key={index}>
              {link.title}
            </Link>
          ))}
        </div>

        {/* Social Links */}
        <div className={styles.socialLinks}>
          {social.map((link, index) => (
            <Link href={link.link.href} passHref key={index}>
              <img src={link.icon.url} alt={link.title} />
            </Link>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <p className={styles.copyright}>
        {copyright || `© ${new Date().getFullYear()} Your Name. All rights reserved.`}
      </p>
    </footer>
  );
}

