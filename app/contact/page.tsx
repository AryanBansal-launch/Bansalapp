import Link from 'next/link';
import styles from '../../styles/contact.module.css';

export default function Contact() {
  return (
    <div className={styles.main}>
      <h1 className='h1'>Contact Me</h1>
      <form className={styles.form}>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" required></textarea>
        <button type="submit">Send</button>
      </form>
      <div className={styles.info}>
        <div className={styles.detail}>
          <img src="/address-icon.svg" alt="Address" />
          <p>123 Main Street, Your City, Your Country</p>
        </div>
        <div className={styles.detail}>
          <img src="/phone-icon.svg" alt="Phone" />
          <p>+123 456 7890</p>
        </div>
        <div className={styles.detail}>
          <img src="/email-icon.svg" alt="Email" />
          <p>yourname@example.com</p>
        </div>
        <div className={styles.social}>
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
    </div>
  );
}
