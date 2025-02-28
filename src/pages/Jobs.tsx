import axios from 'axios';
import { useEffect, useState } from 'react';
import JobListing from '../components/JobListing';
import styles from '../styles/Jobs.module.css';
const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
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
    getJobs();
  }, []);
  return (
    <div className={styles.job_listing_page}>
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Filter by category (e.g., Frontend, JavaScript)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
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
        <button
          onClick={() => {
            setCategory('');
            setLocation('');
            setExperienceLevel('');
          }}
        >
          Clear Filters
        </button>
      </div>

      <JobListing listing={filteredJobs} />
    </div>
  );
};

export default Jobs;
