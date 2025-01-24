'use client';
import Link from 'next/link';
import styles from '../../styles/contact.module.css';
import { getconatctRes } from '@/helper';
import { useState, useEffect, FormEvent } from 'react';

interface Icon {
  url: string;
}

interface Address {
  icon: Icon;
  address: string;
}

interface Phone {
  icon: Icon;
  phone_no_: string;
}

interface Email {
  icon: Icon;
  email_address: string;
}

interface SocialLink {
  social_link_url: {
    title: string;
    href: string;
  };
}

interface SocialLinks {
  social_link: SocialLink[];
}

interface Contact {
  address: Address;
  email_details: Email;
  phone_details: Phone;
  social_links: SocialLinks;
}

export default function Contact() {
  const [contactData, setContactData] = useState<Contact | null>(null);

  useEffect(() => {
    async function fetchContactData() {
      try {
        const response = await getconatctRes('/contact');
        setContactData((response.page_components[0].contact_details) as unknown as Contact);
        console.log("Contact Data from frontend:", response.page_components[0].contact_details);
      } catch (error) {
        console.error('Error fetching contact data:', error);
      }
    }
    fetchContactData();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    alert('Thank you for your message! We will get back to you soon.');

    e.currentTarget.reset();
  };

  if (!contactData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.main}>
      <h1 className="h1">Reach Out to Me!</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" required></textarea>
        <button type="submit">Send</button>
      </form>
      <div className={styles.info}>
        <div className={styles.detail}>
          <img src={contactData.address.icon.url} alt="Address Icon" />
          <p>{contactData.address.address}</p>
        </div>
        <div className={styles.detail}>
          <img src={contactData.phone_details.icon.url} alt="Phone Icon" />
          <p>{contactData.phone_details.phone_no_}</p>
        </div>
        <div className={styles.detail}>
          <img src={contactData.email_details.icon.url} alt="Email Icon" />
          <p>{contactData.email_details.email_address}</p>
        </div>
        <div className={styles.social}>
          {contactData.social_links.social_link.map((link, index) => (
            <Link key={index} href={link.social_link_url.href} passHref>
              {/* <img src={link.social_link_url.title} alt={link.social_link_url.title} /> */}
              <p>{link.social_link_url.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


