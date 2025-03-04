import JobListing from '../components/JobListing';
import styles from '../styles/Jobs.module.css';
import Container from '../components/Container';
import { FaLocationDot } from 'react-icons/fa6';
import { AiOutlineFileUnknown } from 'react-icons/ai';
import { SiLevelsdotfyi } from 'react-icons/si';
import useJobs from '../hooks/useJobs';
import { Loader } from '../components/Loader';
import { useJobFilters } from '../hooks/useJobFilters';
import useFilteredJobs from '../hooks/useFilteredJobs';
import JobFilters from '../components/JobFilters';
const Jobs = () => {
  const { jobs, jobSectors, locations, experienceLevels, loading } = useJobs();
  const {
    searchTerm,
    category,
    location,
    experienceLevel,
    role,
    position,
    company,
  } = useJobFilters();
  const filteredJobs = useFilteredJobs(jobs, searchTerm, {
    category,
    location,
    experienceLevel,
  });
  if (loading) return <Loader />;

  let title = 'All Jobs';
  if (category) title = `${category} Jobs`;
  if (role) title = `${role} Jobs`;
  if (company) title = `Jobs @${company}`;
  if (position) title = `${position} Jobs`;
  return (
    <div className={styles.job_listing_page}>
      <JobFilters
        jobs={jobs}
        jobSectors={jobSectors}
        locations={locations}
        experienceLevels={experienceLevels}
      />
      <Container>
        <div className={styles.listing_header}>
        <h2 className={styles.listing_title}>{title}</h2>
          {location && (
            <div className={styles.option_display}>
              <FaLocationDot />
              <p>{location} </p>
            </div>
          )}
          {experienceLevel && (
            <div className={styles.option_display}>
              <SiLevelsdotfyi />
              <p>{experienceLevel} </p>
            </div>
          )}
        </div>
        <section>
          {filteredJobs.length > 0 ? (
            <JobListing listing={filteredJobs} />
          ) : (
            <p className={styles.no_listing}>
              <AiOutlineFileUnknown />
              No jobs found.
            </p>
          )}
        </section>
      </Container>
    </div>
  );
};

export default Jobs;
