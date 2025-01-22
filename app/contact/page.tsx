import styles from '../../styles/contact.module.css';

export default function Contact() {
  return (
    <div className={styles.main}>
      <h1>Contact Me</h1>
      <form className={styles.form}>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" required></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
