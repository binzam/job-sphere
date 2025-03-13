import JobListing from '../components/job/JobListing';
import styles from '../styles/Jobs.module.css';
import Container from '../components/common/Container';
import { FaLocationDot } from 'react-icons/fa6';
import { AiOutlineFileUnknown } from 'react-icons/ai';
import { SiLevelsdotfyi } from 'react-icons/si';
import useJobs from '../hooks/useJobs';
import { Loader } from '../components/common/Loader';
import { useJobFilters } from '../hooks/useJobFilters';
import useFilteredJobs from '../hooks/useFilteredJobs';
import JobFilters from '../components/job/JobFilters';
import { IoMdClose } from 'react-icons/io';
import MessageDisplayCard from '../components/common/MessageDisplayCard';
import { useEffect, useState } from 'react';
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

  const filteredJobs = useFilteredJobs(jobs, searchTerm, {
    category,
    location,
    experienceLevel,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(1);
  }, [category, location, experienceLevel, searchTerm]);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  let title = 'Explore Jobs';
  if (category) title = `${category} Jobs`;
  if (position) title = `${position} Jobs`;
  if (role) title = `${role} Jobs`;
  if (company) title = `Jobs at ${company}`;

  if (loading) return <Loader />;
  if (error)
    return (
      <MessageDisplayCard
        message={error || 'Unexpected Error. Please Refresh the page.'}
        type="error"
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
                tabIndex={0}
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
          {currentJobs.length > 0 ? (
            <JobListing listing={currentJobs} />
          ) : (
            <p className={styles.no_listing}>
              <AiOutlineFileUnknown />
              No jobs found.
            </p>
          )}
        </section>
      </Container>
      {totalPages > 1 && (
        <div
          className={styles.pagination}
          role="navigation"
          aria-label="Pagination Navigation"
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft' && currentPage > 1) {
              setCurrentPage((prev) => Math.max(prev - 1, 1));
            }
            if (e.key === 'ArrowRight' && currentPage < totalPages) {
              setCurrentPage((prev) => Math.min(prev + 1, totalPages));
            }
          }}
        >
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={styles.page_button}
            aria-label="Go to previous page"
          >
            Previous
          </button>
          <span className={styles.page_info}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={styles.page_button}
            aria-label="Go to next page"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Jobs;
