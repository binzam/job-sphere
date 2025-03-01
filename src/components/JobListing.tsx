import JobListingCard from './JobListingCard';
import styles from '../styles/JobListing.module.css';
import { Job } from '../interfaces';

interface JobListingProps {
  listing: Job[];
}
const JobListing: React.FC<JobListingProps> = ({ listing }) => {
  return (
    <div className={styles.job_list}>
      {listing.map((job) => (
        <JobListingCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobListing;
