import styles from '../styles/JobListingCard.module.css';
import { Link } from 'react-router-dom';
import { Job } from '../interfaces';
import { TbMoneybag } from 'react-icons/tb';
import JobListingCardHeader from './JobListingCardHeader';

interface JobListingCardProps {
  job: Job;
}

const JobListingCard: React.FC<JobListingCardProps> = ({ job }) => {
  return (
    <article className={styles.job_card}>
      {job.featured && <span className={styles.featured_tag}>Featured</span>}
      <JobListingCardHeader job={job} />
      <div>
        <span className={styles.level}>{job.level},</span>
        <span className={styles.contract}>{job.contract}</span>
      </div>
      <div className={styles.salary}>
        <TbMoneybag />
        <strong>{job.salary}</strong>
      </div>
      <Link to={`/jobs/${encodeURIComponent(job.category)}/${job.id}`}>
        View Details
      </Link>
    </article>
  );
};

export default JobListingCard;
