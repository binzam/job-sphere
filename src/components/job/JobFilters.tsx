import { useState } from 'react';
import styles from '../../styles/JobFilters.module.css';
import { FaChevronDown, FaChevronUp, FaXmark } from 'react-icons/fa6';
import JobCategoryListing from '../filters/JobCategoryListing';
import JobFilterOptionsListing from '../filters/JobFilterOptionsListing';
import JobSearch from '../filters/JobSearch';
import { useJobFilters } from '../../hooks/useJobFilters';
import { Job, JobCategory } from '../../interfaces';

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
    category,
    location,
    experienceLevel,
    clearSpecificFilter,
  } = useJobFilters();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  const handleSelect = (
    filterType: 'category' | 'location' | 'experienceLevel',
    value: string
  ) => {
    handleFilterChange(filterType, value);
    setOpenDropdown(null);
  };
  const clearSelection = (
    filterType: 'category' | 'location' | 'experienceLevel'
  ) => {
    clearSpecificFilter(filterType);
  };
  return (
    <div className={styles.filters}>
      <div className={styles.filters_wrapper}>
        <div className={styles.search_filter}>
          <JobSearch jobs={jobs} layoutType="filter" />
        </div>
        <div className={`${styles.category_filter} `}>
          <button
            className={`${styles.dropdownButton} ${
              category && styles.selected
            }`}
            onClick={() => toggleDropdown('category')}
          >
           <p className={styles.btn_txt}>{category || 'Choose Category'}</p> 
            {category ? (
              <span
                className={styles.filter_clear}
                onClick={(e) => {
                  e.stopPropagation();
                  clearSelection('category');
                }}
              >
                <FaXmark />
              </span>
            ) : openDropdown === 'category' ? (
              <FaChevronUp />
            ) : (
              <FaChevronDown />
            )}
          </button>
          {openDropdown === 'category' && (
            <JobCategoryListing
              listing={jobSectors}
              isDropdown={true}
              onCategorySelect={(value) => handleSelect('category', value)}
              onClose={() => setOpenDropdown(null)}
            />
          )}
        </div>
        <div className={styles.location_filter}>
          <button
            className={`${styles.dropdownButton} ${
              location && styles.selected
            }`}
            onClick={() => toggleDropdown('location')}
          >
           <p className={styles.btn_txt}>{location || 'Location'}</p> 
            {location ? (
              <span
                className={styles.filter_clear}
                onClick={(e) => {
                  e.stopPropagation();
                  clearSelection('location');
                }}
              >
                <FaXmark />
              </span>
            ) : openDropdown === 'location' ? (
              <FaChevronUp />
            ) : (
              <FaChevronDown />
            )}
          </button>
          {openDropdown === 'location' && (
            <JobFilterOptionsListing
              listing={locations}
              onOptionSelect={(value) => handleSelect('location', value)}
              onClose={() => setOpenDropdown(null)}
            />
          )}
        </div>
        <div className={styles.experience_filter}>
          <button
            className={`${styles.dropdownButton} ${
              experienceLevel && styles.selected
            }`}
            onClick={() => toggleDropdown('experienceLevel')}
          >
          <p className={styles.btn_txt}>{experienceLevel || 'Experience'}</p>  
            {experienceLevel ? (
              <span
                className={styles.filter_clear}
                onClick={(e) => {
                  e.stopPropagation();
                  clearSelection('experienceLevel');
                }}
              >
                <FaXmark />
              </span>
            ) : openDropdown === 'experienceLevel' ? (
              <FaChevronUp />
            ) : (
              <FaChevronDown />
            )}
          </button>
          {openDropdown === 'experienceLevel' && (
            <JobFilterOptionsListing
              listing={experienceLevels}
              onOptionSelect={(value) => handleSelect('experienceLevel', value)}
              onClose={() => setOpenDropdown(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default JobFilters;
