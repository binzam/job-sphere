import { useContext } from 'react';
import { JobFilterContext } from '../context/JobFilterContext';

export const useJobFilters = () => {
  const context = useContext(JobFilterContext);
  if (!context) {
    throw new Error(
      'usejobFilters must be used within a JobFilterProvider'
    );
  }
  return context;
};
