import axios from 'axios';
import { Job, JobCategory, SubmitApplicationParams } from '../interfaces';
import API_URL from '../constants';

export const fetchFeaturedJobs = async () => {
  try {
    const response = await axios.get<Job[]>(
      `${API_URL}jobs/`,
      {
        params: { featured: true },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching featured jobs:', error);
    throw new Error('Failed to fetch featured jobs.');
  }
};

export const fetchJobSectors = async () => {
  try {
    const response = await axios.get<JobCategory[]>(
      `${API_URL}sectors/`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching job sectors:', error);
    throw new Error('Failed to fetch job sectors.');
  }
};

export const fetchJobs = async () => {
  try {
    const response = await axios.get<Job[]>(
      `${API_URL}jobs/`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw new Error('Failed to fetch jobs.');
  }
};
export const fetchJobById = async (id: string) => {
  try {
    const response = await axios.get<Job>(
      `${API_URL}jobs/${id}/`
    );
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching job:', error);
    throw new Error('Failed to fetch job.');
  }
};
export const fetchJobsByCategory = async (category: string) => {
  try {
    const response = await axios.get<Job[]>(
      `${API_URL}jobs/`,
      {
        params: {
          category,
        },
      }
    );
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs by category:', error);
    throw new Error('Failed to fetch jobs  by category.');
  }
};
export const submitApplication = async (
  params: SubmitApplicationParams
): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${API_URL}applications`,
      params
    );
    return response.status === 201;
  } catch (error) {
    console.error('Error submitting application:', error);
    return false;
  }
};
