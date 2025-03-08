import { useState, useEffect } from 'react';
import {
  fetchFeaturedJobs,
  fetchJobsByCategory,
  fetchJobById,
  fetchJobs,
  fetchJobSectors,
} from '../api/jobs';
import { Job, JobCategory } from '../interfaces';

const useJobs = () => {
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobSectors, setJobSectors] = useState<JobCategory[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [experienceLevels, setExperienceLevels] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getJobsData = async () => {
      setLoading(true);
      setError(null);
      console.log("APU")
      try {
        const [featured, sectors, allJobs] = await Promise.all([
          fetchFeaturedJobs(),
          fetchJobSectors(),
          fetchJobs(),
        ]);

        setFeaturedJobs(featured);
        setJobSectors(sectors);
        setJobs(allJobs);

        setLocations([...new Set(allJobs.map((job) => job.location))]);
        setExperienceLevels([...new Set(allJobs.map((job) => job.level))]);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };

    getJobsData();
  }, []);

  return {
    featuredJobs,
    jobSectors,
    jobs,
    locations,
    experienceLevels,
    loading,
    error,
  };
};

export const useJob = (id: string) => {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getJob = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchJobById(id);
        setJob(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };

    getJob();
  }, [id]);

  return { job, loading, error };
};

export const useSimilarJobs = (category: string) => {
  const [similarJobs, setSimilarJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getSimilarJobs = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchJobsByCategory(category);
        setSimilarJobs(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      getSimilarJobs();
    }
  }, [category]);

  return { similarJobs, loading, error };
};

export default useJobs;
