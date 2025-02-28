import { FaLocationDot } from 'react-icons/fa6';
import styles from '../styles/JobListingCard.module.css';
import { Link } from 'react-router-dom';
const JobListingCard = ({ job }) => {
  return (
    <article className={styles.job_card}>
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
      <p>{job.contract}</p>
      <div className={styles.price_range}>
        <strong>{job.priceRange}</strong>
      </div>
      <Link to={`/job/${job.id}`}>View Details</Link>
    </article>
  );
};

export default JobListingCard;
