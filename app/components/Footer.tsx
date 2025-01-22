import styles from '../../styles/footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
    </footer>
  );
}
