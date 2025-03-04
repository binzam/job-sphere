import { useState } from 'react';
import styles from '../styles/JobFilters.module.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import JobCategoryListing from './JobCategoryListing';
import JobLocationListing from './JobLocationListing';
import JobSearch from './JobSearch';
import { useJobFilters } from '../hooks/useJobFilters';
import { Job, JobCategory } from '../interfaces';

interface JobFiltersProps {
  jobs: Job[];
  jobSectors: JobCategory[];
  locations: string[];
  experienceLevels: string[];
}

const JobFilters: React.FC<JobFiltersProps> = ({
  jobs,
  jobSectors,
  locations,
  experienceLevels,
}) => {
  const {
    handleFilterChange,
    clearAllFilters,
    category,
    location,
    experienceLevel,
    isAnyFilterApplied,
  } = useJobFilters();

  const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [isExperienceDropdownOpen, setExperienceDropdownOpen] = useState(false);

  const handleCategorySelect = (selectedCategory: string) => {
    handleFilterChange('category', selectedCategory);
    setCategoryDropdownOpen(false);
  };

  const handleLevelSelect = (selectedLevel: string) => {
    handleFilterChange('experienceLevel', selectedLevel);
    setExperienceDropdownOpen(false);
  };

  const handleLocationSelect = (selectedLocation: string) => {
    handleFilterChange('location', selectedLocation);
    setLocationDropdownOpen(false);
  };

  return (
    <div className={styles.filters}>
      <div className={styles.filters_wrapper}>
        <div className={styles.search_filter}>
          <JobSearch jobs={jobs} layoutType="filter" />
        </div>
        <div className={styles.category_filter}>
          <button
            className={styles.dropdownButton}
            onClick={() => setCategoryDropdownOpen(!isCategoryDropdownOpen)}
          >
            {category || 'Choose Category'}
            {isCategoryDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isCategoryDropdownOpen && (
            <JobCategoryListing
              listing={jobSectors}
              isDropdown={true}
              onCategorySelect={handleCategorySelect}
              onClose={() => setCategoryDropdownOpen(false)}
            />
          )}
        </div>
        <div className={styles.location_filter}>
          <button
            className={styles.dropdownButton}
            onClick={() => setLocationDropdownOpen(!isLocationDropdownOpen)}
          >
            {location || 'Choose Location'}
            {isLocationDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isLocationDropdownOpen && (
            <JobLocationListing
              listing={locations}
              onLocationSelect={handleLocationSelect}
              onClose={() => setLocationDropdownOpen(false)}
            />
          )}
        </div>
        <div className={styles.experience_filter}>
          <button
            className={styles.dropdownButton}
            onClick={() => setExperienceDropdownOpen(!isExperienceDropdownOpen)}
          >
            {experienceLevel || 'Experience Level'}
            {isExperienceDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isExperienceDropdownOpen && (
            <JobLocationListing
              listing={experienceLevels}
              onLocationSelect={handleLevelSelect}
              onClose={() => setExperienceDropdownOpen(false)}
            />
          )}
        </div>
        {isAnyFilterApplied && (
          <button className={styles.clear_Button} onClick={clearAllFilters}>
            <IoMdClose /> Clear Filters 
          </button>
        )}
      </div>
    </div>
  );
};

export default JobFilters;
