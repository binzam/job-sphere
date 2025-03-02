import { FaLocationDot } from 'react-icons/fa6';
import styles from '../styles/JobListingCard.module.css';
import { Link } from 'react-router-dom';
import { Job } from '../interfaces';
import { TbMoneybag } from 'react-icons/tb';

interface JobListingCardProps {
  job: Job;
}

const JobListingCard: React.FC<JobListingCardProps> = ({ job }) => {
  return (
    <article className={styles.job_card}>
      {job.featured && <span className={styles.featured_tag}>Featured</span> }
      <h3>{job.position}</h3>
      <div className={styles.job_info}>
        <div className={styles.job_logo}>
          <img
            src={job.logo}
            alt={`${job.company} logo`}
            width="50"
            height="50"
          />
        </div>
        <div className={styles.job_info_col}>
          <p className={styles.company_name}>@{job.company}</p>

          <div className={styles.flex_gap}>
            <FaLocationDot />
            <p>{job.location} </p>
          </div>
        </div>
      </div>
      <p className={styles.contract}>{job.contract}</p>
      <div className={styles.salary}>
      <TbMoneybag />
        <strong>{job.salary}</strong>
      </div>
      <Link to={`/jobs/${encodeURIComponent(job.category)}/${job.id}`}>View Details</Link>
    </article>
  );
};

export default JobListingCard;
