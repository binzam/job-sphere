import axios from 'axios';
import { useEffect, useState } from 'react';
import JobListing from '../components/JobListing';
import styles from '../styles/Jobs.module.css';
import { Job } from '../interfaces';
import Container from '../components/Container';
import { useNavigate, useParams } from 'react-router-dom';
import JobCategoryListing from '../components/JobCategoryListing';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { AiOutlineFileUnknown } from 'react-icons/ai';
const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const { category: categoryParam } = useParams<{ category?: string }>();
  const decodedCategory = categoryParam
    ? decodeURIComponent(categoryParam)
    : '';
  const navigate = useNavigate();
  const [jobSectors, setJobSectors] = useState([]);
  const [category, setCategory] = useState(decodedCategory);
  const [location, setLocation] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [isCategorydropdownOpen, setCategoryDropdownOpen] = useState(false);

  const getJobSectors = async () => {
    try {
      const response = await axios.get('http://localhost:3000/sectors');
      console.log(response);
      setJobSectors(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getJobSectors();
  }, []);
  const getJobs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/jobs');
      console.log(response);
      setJobs(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let filtered = jobs;

    if (category) {
      filtered = filtered.filter(
        (job) =>
          job.category.toLowerCase() === category.toLocaleLowerCase() ||
          job.role.toLowerCase().includes(category.toLowerCase()) ||
          job.languages.some((lang) =>
            lang.toLowerCase().includes(category.toLowerCase())
          ) ||
          job.tools.some((tool) =>
            tool.toLowerCase().includes(category.toLowerCase())
          )
      );
    }

    if (location) {
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (experienceLevel) {
      filtered = filtered.filter((job) =>
        job.level.toLowerCase().includes(experienceLevel.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  }, [category, location, experienceLevel, jobs]);
  useEffect(() => {
    setCategory(decodedCategory);
  }, [decodedCategory]);
  useEffect(() => {
    getJobs();
  }, []);

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
    navigate(`/jobs/${encodeURIComponent(selectedCategory)}`);
  };
  const clearFilters = () => {
    setCategory('');
    setLocation('');
    setExperienceLevel('');
    navigate('/jobs');
  };
  return (
    <Container>
      <div className={styles.job_listing_page}>
        <div className={styles.filters}>
          <div className={styles.category_filter}>
            <button
              className={styles.dropdownButton}
              onClick={() => setCategoryDropdownOpen(!isCategorydropdownOpen)}
            >
              {category ? category : 'Choose Category'}
              {isCategorydropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isCategorydropdownOpen && (
              <JobCategoryListing
                listing={jobSectors}
                isDropdown={true}
                onCategorySelect={handleCategorySelect}
                onClose={() => setCategoryDropdownOpen(false)}
              />
            )}
          </div>

          <input
            type="text"
            placeholder="Filter by location (e.g., Remote, USA)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <select
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
          >
            <option value="">All Experience Levels</option>
            <option value="Junior">Entry-Level</option>
            <option value="Midweight">Mid-Level</option>
            <option value="Senior">Senior</option>
          </select>
          <button className={styles.clear_Button} onClick={clearFilters}>
            Clear Filters <IoMdClose />
          </button>
        </div>
        <section>
          <h2 className={styles.listing_title}>
            {!category ? 'All Categories' : category + ' jobs'}
          </h2>
          {filteredJobs.length > 0 ? (
            <JobListing listing={filteredJobs} />
          ) : (
            <p className={styles.no_listing}>
              <AiOutlineFileUnknown />
              No jobs found.
              
            </p>
          )}
        </section>
      </div>
    </Container>
  );
};

export default Jobs;
