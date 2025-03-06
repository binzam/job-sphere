import styles from '../styles/About.module.css';

const About = () => {
  return (
      <div className={styles.about_container}>
      <h2 className={styles.heading}>About Job Sphere</h2>
      <p className={styles.subtext}>
        Welcome to JobSphere, your ultimate destination for finding the perfect
        job or the ideal candidate.
      </p>

      <div className={styles.section}>
        <h3>Our Mission</h3>
        <p>
          At JobSphere, we aim to bridge the gap between job seekers and
          employers by providing a seamless and interactive job search
          experience. We believe in making job hunting **efficient, accessible,
          and rewarding**.
        </p>
      </div>

      <div className={styles.section}>
        <h3>What We Offer</h3>
        <ul>
          <li>
            🌍 **A Wide Range of Job Listings** – Explore opportunities across
            multiple industries.
          </li>
          <li>
            ⚡ **Easy Applications** – Apply with a few clicks using our
            user-friendly platform.
          </li>
          <li>
            🔎 **Advanced Job Search & Filtering** – Find jobs that match your
            skills and preferences.
          </li>
          <li>
            🛠️ **Career Resources & Guidance** – Access expert tips and
            insights.
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h3>Why Choose Us?</h3>
        <p>
          We are committed to helping professionals **advance their careers**
          and empowering businesses to **find the best talent**. With an
          interactive and AI-powered job-matching system, we make hiring
          **smarter, faster, and easier**.
        </p>
      </div>

      <h3 className={styles.join_us}>
        Join JobSphere and take the next step in your career journey!
      </h3>
    </div>
  );
};

export default About;
