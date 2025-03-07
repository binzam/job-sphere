import styles from '../styles/PrivacyTerms.module.css';

const Terms = () => {
  return (
    <div className={styles.legal_container}>
      <h1>Terms and Conditions</h1>
      <p>
        Welcome to our job board platform. These terms outline the rules and
        regulations for using our website.
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing this website, you agree to be bound by these Terms and
        Conditions.
      </p>

      <h2>2. User Responsibilities</h2>
      <p>
        Users must provide accurate information when creating job postings or
        applying for jobs.
      </p>

      <h2>3. Prohibited Activities</h2>
      <p>
        Users are not allowed to post misleading job listings or use offensive
        language.
      </p>

      <h2>4. Liability Disclaimer</h2>
      <p>
        We are not responsible for any job-related disputes between employers
        and applicants.
      </p>

      <h2>5. Changes to Terms</h2>
      <p>We reserve the right to update these terms at any time.</p>

      <p className={styles.footer_note}>Last updated: March 2025</p>
    </div>
  );
};

export default Terms;
