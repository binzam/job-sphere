import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Job } from '../interfaces';
import styles from '../styles/JobDescription.module.css';
import Container from '../components/Container';
import { Loader } from '../components/Loader';
import JobListing from '../components/JobListing';
import JobDetailCard from '../components/JobDetailCard';
const JobDescription = () => {
  const { category: categoryParam, id } = useParams<{
    category?: string;
    id: string;
  }>();
  const decodedCategory = categoryParam
    ? decodeURIComponent(categoryParam)
    : '';

  const [similarJobs, setSimilarJobs] = useState<Job[]>([]);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get<Job>(
          `http://localhost:3000/jobs/${id}/`
        );
        console.log(response);

        setJob(response.data);
      } catch (error) {
        console.log(error);
        setError('Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };

    const getSimilarJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/jobs', {
          params: {
            category: decodedCategory,
          },
        });
        console.log(response);
        setSimilarJobs(response.data.slice(0, 3));
      } catch (error) {
        console.log(error);
      }
    };

    fetchJob();
    getSimilarJobs();
  }, [id, decodedCategory]);

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
