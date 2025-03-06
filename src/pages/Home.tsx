import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Home.module.css';
import JobListing from '../components/JobListing';
import Container from '../components/Container';
import JobCategoryListing from '../components/JobCategoryListing';
import JobSearch from '../components/JobSearch';
import useJobs from '../hooks/useJobs';
import { Loader } from '../components/Loader';
import { JobFilterProvider } from '../context/JobFilterContext';
import { FaLongArrowAltRight } from 'react-icons/fa';
const Home = () => {
  const { featuredJobs, jobSectors, loading, error, jobs } = useJobs();
  const navigate = useNavigate();

  const handleSearchSelect = (searchParams: { [key: string]: string }) => {
    const params = new URLSearchParams(searchParams);
    navigate(`/jobs?${params.toString()}`);
    return;
  };
  if (loading) return <Loader />;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.home}>
      <JobFilterProvider>
        <section className={styles.hero}>
          <div className={styles.hero_overlay}>
            <div className={styles.hero_content}>
              <h1>Find Your Dream Job Today</h1>
              <p>
                Join thousands of companies and candidates connecting on our
                platform.
              </p>
              <JobSearch jobs={jobs} onSearchSelect={handleSearchSelect} layoutType='hero' />
            </div>
          </div>
        </section>
      </JobFilterProvider>

      <Container className="no_pad">
        <section className={styles.featured_jobs}>
          <h2>Featured Jobs</h2>
          <JobListing listing={featuredJobs} />

          <Link to="/jobs" className={styles.cta_button}>
            See All Jobs<FaLongArrowAltRight />
          </Link>
        </section>
      </Container>

      <Container className="no_pad">
        <section className={styles.featured_jobs}>
          <h2>Find Jobs by Category</h2>
          <JobCategoryListing listing={jobSectors} />
          <Link to="/jobs" className={styles.cta_button}>
            See All Jobs <FaLongArrowAltRight />
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
