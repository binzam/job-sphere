import { Link } from 'react-router-dom';
import styles from '../styles/PrivacyTerms.module.css';

const Privacy = () => {
  return (
    <div className={styles.legal_container}>
      <h1>Privacy Policy</h1>
      <p>
        Your privacy is important to us. This policy explains how we handle user
        data.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        We collect personal details such as names, emails, and job preferences
        when you sign up.
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>
        We use your data to match job seekers with employers and improve
        platform services.
      </p>

      <h2>3. Data Protection</h2>
      <p>
        We take necessary measures to protect your data from unauthorized
        access.
      </p>

      <h2>4. Cookies</h2>
      <p>Our website uses cookies to enhance user experience.</p>

      <h2>5. Contact Us</h2>
      <p>
        If you have questions about this policy, reach out via our contact page.
      </p>

      <p className={styles.footer_note}>Last updated: March 2025</p>
      <p>
        You may also want to read our
        <Link to="/terms-and-conditions">Terms & conditions</Link>.
      </p>
    </div>
  );
};

export default Privacy;
