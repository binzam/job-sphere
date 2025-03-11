import { Link, useParams } from 'react-router-dom';
import styles from '../styles/JobDescription.module.css';
import Container from '../components/common/Container';
import { Loader } from '../components/common/Loader';
import JobListing from '../components/job/JobListing';
import JobDetailCard from '../components/job/JobDetailCard';
import { useJob, useSimilarJobs } from '../hooks/useJobs';
import MessageDisplayCard from '../components/common/MessageDisplayCard';
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

        <div className={styles.similar_listings}>
          <small>
            {similarJobs.length > 0
              ? 'Similar Jobs'
              : 'no similar jobs at the moment'}
          </small>
          <JobListing listing={similarJobs} />
          <Link to="/jobs" className={styles.cta_button}>
            <IoMdArrowRoundBack />
            See All Jobs
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default JobDescription;
