import { Link } from 'react-router-dom';
import styles from '../styles/Home.module.css';
import { FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';
import JobListing from '../components/JobListing';
import Container from '../components/Container';
import JobCategoryListing from '../components/JobCategoryListing';
const Home = () => {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [jobSectors, setJobSectors] = useState([]);

  const getFeaturedJobs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/jobs', {
        params: {
          featured: true,
        },
      });
      console.log(response);
      setFeaturedJobs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getJobSectors = async () => {
    try {
      const response = await axios.get('http://localhost:3000/sectors');
      console.log(response);
      setJobSectors(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFeaturedJobs();
    getJobSectors();
  }, []);

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.hero_overlay}>
          <div className={styles.hero_content}>
            <h1>Find Your Dream Job Today</h1>
            <p>
              Join thousands of companies and candidates connecting on our
              platform.
            </p>
            <div className={styles.search_bar}>
              <span className={styles.search_icon}>
                <FaSearch />
              </span>
              <input type="text" placeholder="Job title, company, city ..." />
              <button>Search Jobs</button>
            </div>
          </div>
        </div>
      </section>

      <Container className="no_pad">
        <section className={styles.featured_jobs}>
          <h2>Featured Jobs</h2>
          <JobListing listing={featuredJobs} />

          <Link to="/jobs" className={styles.cta_button}>
            See All Jobs
          </Link>
        </section>
      </Container>

      <Container className="no_pad">
        <section className={styles.featured_jobs}>
          <h2>Find Jobs</h2>
          <JobCategoryListing listing={jobSectors} />
          <Link to="/jobs" className={styles.cta_button}>
            See All Jobs
          </Link>
        </section>
      </Container>

      <section className={styles.employer_cta}>
        <h2>Are You Hiring?</h2>
        <p>Post your job openings and find the best talent.</p>
        <Link to="/employer/signup" className={styles.cta_button}>
          Post a Job
        </Link>
      </section>

      <section className={styles.job_seeker_cta}>
        <h2>Ready to Take the Next Step?</h2>
        <p>Create a profile, upload your resume, and start applying today.</p>
        <Link to="/join" className={styles.cta_button}>
          Sign Up Now
        </Link>
      </section>
    </div>
  );
};

export default Home;
