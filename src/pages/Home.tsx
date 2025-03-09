import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/Home.module.css';
import JobListing from '../components/JobListing';
import Container from '../components/Container';
import JobCategoryListing from '../components/JobCategoryListing';
import JobSearch from '../components/JobSearch';
import useJobs from '../hooks/useJobs';
import { Loader } from '../components/Loader';
import { JobFilterProvider } from '../context/JobFilterContext';
import { FaLongArrowAltRight } from 'react-icons/fa';
import MessageDisplayCard from '../components/MessageDisplayCard';
const Home = () => {
  const { featuredJobs, jobSectors, loading, error, jobs } = useJobs();
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.successMessage;
  const handleSearchSelect = (searchParams: { [key: string]: string }) => {
    const params = new URLSearchParams(searchParams);
    navigate(`/jobs?${params.toString()}`);
    return;
  };
  if (loading) return <Loader />;
  if (error)
    return (
      <MessageDisplayCard
        message={error || 'Unexpected Error. Please Refresh the page.'}
        type="error"
      />
    );

  return (
    <div className={styles.home}>
      <JobFilterProvider>
        {successMessage && (
          <MessageDisplayCard
            message={successMessage}
            type="success"
            autoHide
          />
        )}
        <section className={styles.hero}>
          <div className={styles.hero_overlay}>
            <div className={styles.hero_content}>
              <h1>Find Your Dream Job Today!</h1>
              <p>
                Join thousands of companies and candidates connecting on our
                platform.
              </p>
              <JobSearch
                jobs={jobs}
                onSearchSelect={handleSearchSelect}
                layoutType="hero"
              />
            </div>
          </div>
        </section>
      </JobFilterProvider>

      <Container className="no_pad">
        <section className={styles.home_top_section}>
          <h2>Featured Jobs</h2>
          <JobListing listing={featuredJobs} />

          <Link to="/jobs" className={styles.cta_button}>
            See All Jobs
            <FaLongArrowAltRight />
          </Link>
        </section>
      </Container>

      <Container className="no_pad">
        <section className={styles.home_top_section}>
          <h2>Explore by Category</h2>
          <JobCategoryListing listing={jobSectors} />
        </section>
      </Container>

      <section className={styles.hiring_stats}>
        <h2>Why Choose Job Sphere?</h2>
        <p>Thousands of job seekers and employers trust us. Here’s why:</p>

        <Container className='no_pad'>
          <div className={styles.stats_grid}>
            <div className={styles.stat_card}>
              <h3>10K+</h3>
              <p>Jobs Listed</p>
            </div>
            <div className={styles.stat_card}>
              <h3>5K+</h3>
              <p>Successful Hires</p>
            </div>
            <div className={styles.stat_card}>
              <h3>500+</h3>
              <p>Top Companies Hiring</p>
            </div>
            <div className={styles.stat_card}>
              <h3>95%</h3>
              <p>Satisfaction Rate</p>
            </div>
          </div>
        </Container>
      </section>
      <section className={styles.employer_cta}>
        <h2>Are You Hiring?</h2>
        <p>Post your job openings and find the best talent.</p>
        <Link to="/employer/signup" className={styles.cta_button}>
          Post a Job
        </Link>
      </section>
      <section className={styles.success_stories}>
        <h2>Success Stories</h2>
        <p>
          Hear from job seekers and employers who found success on our platform.
        </p>
        <div className={styles.testimonials}>
          <div className={styles.testimonial_card}>
            <p>
              "I landed my dream job within a week of signing up! The platform
              made it so easy to connect with top employers."
            </p>
            <span>- Alex J.</span>
          </div>
          <div className={styles.testimonial_card}>
            <p>
              "As a recruiter, I was able to find the perfect candidate in no
              time. The process was seamless and efficient!"
            </p>
            <span>- Sarah M.</span>
          </div>
        </div>
      </section>

      <section className={styles.job_seeker_cta}>
        <h2>Ready to Take the Next Step?</h2>
        <p>Create a profile and start applying for your dream job today.</p>
        <Link to="/" className={styles.cta_button}>
          Sign Up Now
        </Link>
      </section>
    </div>
  );
};

export default Home;
