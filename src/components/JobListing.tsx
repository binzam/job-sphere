import JobListingCard from './JobListingCard';
import styles from '../styles/JobListing.module.css';
const JobListing = ({ listing }) => {
  return (
    <div className={styles.job_list}>
      {listing.map((job) => (
        <JobListingCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobListing;
