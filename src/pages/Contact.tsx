import styles from '../styles/Contact.module.css';

const Contact = () => {
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

      <h3 className={styles.subheading}>Get in Touch</h3>
      <form className={styles.contact_form}>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" rows={5} required />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
