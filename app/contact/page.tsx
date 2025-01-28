'use client';
import Link from 'next/link';
import styles from '../../styles/contact.module.css';
import { getconatctRes } from '@/helper';
import { useState, useEffect, FormEvent } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from 'emailjs-com';
import { EmailJSResponseStatus } from 'emailjs-com';

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

    // Get form data
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Set up EmailJS parameters
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
    };

    // Send email using EmailJS
    emailjs.send('service_13anu8h', 'template_j9dk508', templateParams, 'w63ZLSehLnKIOSKII')
      .then(
        (response: EmailJSResponseStatus) => {
          console.log('Success:', response);
          toast.success('Thank you for your message! I will get back to you soon.');
          form.reset();
        },
        (error: Error) => {
          console.error('Error:', error);
          toast.error('Something went wrong. Please try again later.');
        }
      );
  };

  if (!contactData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.main}>
      <h1 className="h1">Reach Out to Me!</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message. Please start with mentioning your email id." required></textarea>
        <button type="submit">Send</button>
      </form>
      <div className={styles.info}>
        <div className={styles.detail}>
          <img src={contactData.address.icon.url} alt="Address Icon" />
          <p>{contactData.address.address}</p>
        </div>
        <div className={styles.detail}>
          <img src={contactData.phone_details.icon.url} alt="Phone Icon" />
          <p>+91 {contactData.phone_details.phone_no_}</p>
        </div>
        <div className={styles.detail}>
          <img src={contactData.email_details.icon.url} alt="Email Icon" />
          <p>{contactData.email_details.email_address}</p>
        </div>
        <div className={styles.social}>
          {contactData.social_links.social_link.map((link, index) => (
            <Link key={index} href={link.social_link_url.href} passHref>
              <img
                src={
                  link.social_link_url.title === "Github"
                    ? "https://images.contentstack.io/v3/assets/bltf0c40becc08e1275/bltd77a9f79cb4b5a70/67920d2b259b9aeee6267914/github-brands-solid.svg"
                    : link.social_link_url.title === "Linked in"
                    ? "https://images.contentstack.io/v3/assets/bltf0c40becc08e1275/bltcd519e7e59846bd7/67920cc7bc13495e79d5cc57/linkedin-brands-solid.svg"
                    : link.social_link_url.title === "Instagram"
                    ? "https://images.contentstack.io/v3/assets/bltf0c40becc08e1275/bltb8efd1cf701a6459/67920cc758fb6d359081245c/instagram-brands-solid.svg"
                    : link.social_link_url.title
                }
                alt={link.social_link_url.title}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

