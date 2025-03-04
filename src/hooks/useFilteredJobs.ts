import { useMemo } from 'react';
import { Job } from '../interfaces';

interface FilterCriteria {
  category: string;
  location: string;
  experienceLevel: string;
}

const useFilteredJobs = (
  jobs: Job[],
  searchTerm: { [key: string]: string },
  { category, location, experienceLevel }: FilterCriteria
) => {
  return useMemo(() => {
    if (!jobs || jobs.length === 0) return [];
    const trimmedSearchTerm =
      Object.keys(searchTerm).length === 0
        ? ''
        : searchTerm[Object.keys(searchTerm)[0]]?.toLowerCase() || '';

    return jobs.filter((job) => {
      const matchesSearchTerm = trimmedSearchTerm
        ? Object.values(job).some(
            (value) =>
              typeof value === 'string' &&
              value.toLowerCase().includes(trimmedSearchTerm)
          )
        : true;

      const matchesCategory = category ? job.category === category : true;
      const matchesLocation = location ? job.location === location : true;
      const matchesExperience = experienceLevel
        ? job.level === experienceLevel
        : true;

      return (
        matchesSearchTerm &&
        matchesCategory &&
        matchesLocation &&
        matchesExperience
      );
    });
  }, [jobs, searchTerm, category, location, experienceLevel]);
};

export default useFilteredJobs;
