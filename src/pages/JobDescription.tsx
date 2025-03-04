import { Link, useParams } from 'react-router-dom';
import styles from '../styles/JobDescription.module.css';
import Container from '../components/Container';
import { Loader } from '../components/Loader';
import JobListing from '../components/JobListing';
import JobDetailCard from '../components/JobDetailCard';
import { useJob, useSimilarJobs } from '../hooks/useJobs';
const JobDescription = () => {
  const { category: categoryParam, id } = useParams<{
    category?: string;
    id: string;
  }>();
  const decodedCategory = categoryParam
    ? decodeURIComponent(categoryParam)
    : '';

  const { job, loading, error } = useJob(id!);
  const { similarJobs } = useSimilarJobs(decodedCategory);

  if (loading) return <Loader />;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!job) return <p className={styles.not_found}>Job not found</p>;
  return (
    <Container>
      <div className={styles.job_description_page}>
        <JobDetailCard job={job} />

        <div className={styles.similar_listings}>
          <small>Similar Jobs</small>
          <JobListing listing={similarJobs} />
          <Link to="/jobs" className={styles.cta_button}>
            See All Jobs
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default JobDescription;
