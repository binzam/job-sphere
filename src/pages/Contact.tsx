import { useState } from 'react';
import styles from '../styles/Contact.module.css';
import MessageDisplayCard from '../components/MessageDisplayCard';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };
  return (
    <div className={styles.contact_container}>
      <h2 className={styles.heading}>Contact Us</h2>
      <p className={styles.subtext}>
        Have questions or need assistance? We're here to help!
      </p>

      <div className={styles.contact_info}>
        <div>
          <h3>Email</h3>
          <p>support@jobsphere.com</p>
        </div>

        <div>
          <h3>Phone</h3>
          <p>+0 (123) 123-4567</p>
        </div>

        <div>
          <h3>Office Address</h3>
          <p>123 JobSphere Lane, Job City, Job 001</p>
        </div>
      </div>

      {isSubmitted ? (
        <MessageDisplayCard
          message="Thank you for reaching out! We'll get back to you soon."
          type='success'
          autoHide
        />
      ) : (
        <form className={styles.contact_form} onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows={5} required />
          <button type="submit">Send Message</button>
        </form>
      )}
    </div>
  );
};

export default Contact;
