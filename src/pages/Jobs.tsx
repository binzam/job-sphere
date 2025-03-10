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
import { IoMdClose } from 'react-icons/io';
import MessageDisplayCard from '../components/MessageDisplayCard';
import { useEffect } from 'react';
const Jobs = () => {
  const { jobs, jobSectors, locations, experienceLevels, loading, error } =
    useJobs();
  const {
    searchTerm,
    category,
    location,
    experienceLevel,
    role,
    position,
    company,
    isAnyFilterApplied,
    clearAllFilters,
  } = useJobFilters();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [category, location, experienceLevel]);
  const filteredJobs = useFilteredJobs(jobs, searchTerm, {
    category,
    location,
    experienceLevel,
  });
  let title = 'Explore Jobs';
  if (category) title = `${category} Jobs`;
  if (role) title = `${role} Jobs`;
  if (company) title = `Jobs at ${company}`;
  if (position) title = `${position} Jobs`;

  if (loading) return <Loader />;
  if (error)
    return (
      <MessageDisplayCard
        message={error || 'Unexpected Error. Please Refresh the page.'}
        type="success"
      />
    );

  return (
    <div className={styles.job_listing_page}>
      <JobFilters
        jobs={jobs}
        jobSectors={jobSectors}
        locations={locations}
        experienceLevels={experienceLevels}
      />

      <Container>
        <section className={styles.job_listing_section}>
          <div className={styles.listing_header_wrap}>
            {isAnyFilterApplied && (
              <button
                className={styles.clear_all_Button}
                onClick={clearAllFilters}
              >
                <IoMdClose /> Clear All Filters
              </button>
            )}
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
          </div>
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
