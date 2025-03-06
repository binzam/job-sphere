import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import styles from '../styles/JobListingCard.module.css';
import { Job } from '../interfaces';

interface JobListingCardHeaderProps {
  job: Job;
}

const JobListingCardHeader: React.FC<JobListingCardHeaderProps> = ({ job }) => {
  return (
    <div className={styles.job_card_header}>
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
    </div>
  );
};

export default JobListingCardHeader;
