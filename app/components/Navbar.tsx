import Link from 'next/link';
import styles from '../../styles/navbar.module.css';

interface NavbarProps {
      image?: string;
  }

export default function Navbar({image}:NavbarProps) {
  return (
    <nav className={styles.navbar}>
        <img src={image} alt="logo" width={100} height={50} />
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/projects">Projects</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}
