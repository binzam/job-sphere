import { Link, useParams } from 'react-router-dom';
import styles from '../styles/JobDescription.module.css';
import Container from '../components/Container';
import { Loader } from '../components/Loader';
import JobListing from '../components/JobListing';
import JobDetailCard from '../components/JobDetailCard';
import { useJob, useSimilarJobs } from '../hooks/useJobs';
import MessageDisplayCard from '../components/MessageDisplayCard';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useUser } from '../hooks/useUser';
const JobDescription = () => {
  const { category: categoryParam, id } = useParams<{
    category?: string;
    id: string;
  }>();
  const decodedCategory = categoryParam
    ? decodeURIComponent(categoryParam)
    : '';

  const { job, loading, error } = useJob(id!);
  const { similarJobs } = useSimilarJobs(decodedCategory, id!);
  const { user } = useUser();
  const isAuthenticated = user ? true : false;
  if (loading) return <Loader />;
  if (error || !job)
    return (
      <>
        <MessageDisplayCard
          message={error || 'Job not found. Please go back.'}
          type="error"
        />
        <Link to="/jobs" className={styles.not_found_link}>
          <IoMdArrowRoundBack /> Back to All Jobs
        </Link>
      </>
    );

  return (
    <Container>
      <div className={styles.job_description_page}>
        <JobDetailCard job={job} isAuthenticated={isAuthenticated} />

        {similarJobs.length > 0 && (
          <div className={styles.similar_listings}>
            <small>Similar Jobs</small>
            <JobListing listing={similarJobs} />
            <Link to="/jobs" className={styles.cta_button}>
              <IoMdArrowRoundBack />
              See All Jobs
            </Link>
          </div>
        )}
      </div>
    </Container>
  );
};

export default JobDescription;
