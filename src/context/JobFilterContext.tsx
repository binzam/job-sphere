import { createContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
type JobFilterContextType = {
  category: string;
  location: string;
  experienceLevel: string;
  position: string;
  company: string;
  role: string;
  searchInput: string;
  searchKey: string;
  searchValue: string;
  searchTerm: Record<string, string>;
  setSearchInput: (value: string) => void;
  clearAllFilters: () => void;
  clearSearchFilter: () => void;
  handleSearchTermChange: (matchedJob: Record<string, string>) => void;
  handleFilterChange: (filterKey: string, filterValue: string) => void;
  isAnyFilterApplied: boolean;
  clearSpecificFilter: (
    filterType: 'category' | 'location' | 'experienceLevel' | 'search'
  ) => void;
};

const JobFilterContext = createContext<JobFilterContextType | null>(null);

const JobFilterProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const getParam = (key: string) => searchParams.get(key) || '';
  const [searchTerm, setSearchTerm] = useState<Record<string, string>>(() => {
    const term: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      if (['role', 'position', 'company'].includes(key)) {
        term[key] = value;
      }
    });
    return term;
  });
  const [searchInput, setSearchInput] = useState(
    getParam(Object.keys(searchTerm)[0]) || ''
  );
  const [category, setCategory] = useState(getParam('category'));
  const [location, setLocation] = useState(getParam('location'));
  const [experienceLevel, setExperienceLevel] = useState(
    getParam('experienceLevel')
  );
  const [position, setPosition] = useState(getParam('position'));
  const [role, setRole] = useState(getParam('role'));
  const [company, setCompany] = useState(getParam('company'));

  const updateSearchParams = (newParams: Record<string, string>) => {
    setSearchParams((prev) => {
      const updatedParams = new URLSearchParams(prev);
      Object.entries(newParams).forEach(([key, value]) => {
        if (value) updatedParams.set(key, value);
        else updatedParams.delete(key);
      });
      return updatedParams;
    });
  };

  const handleSearchTermChange = (matchedJob: Record<string, string>) => {
    if (!matchedJob) return;
    const [key, value] = Object.entries(matchedJob)[0];
    setSearchTerm(matchedJob);
    switch (key) {
      case 'company':
        setCompany(value);
        break;
      case 'role':
        setRole(value);
        break;
      case 'position':
        setPosition(value);
        break;
      default:
        setSearchTerm(matchedJob);
    }
    updateSearchParams({ ...matchedJob });
  };

  const handleFilterChange = (filterKey: string, filterValue: string) => {
    const stateSetters: Record<
      string,
      React.Dispatch<React.SetStateAction<string>>
    > = {
      category: setCategory,
      location: setLocation,
      experienceLevel: setExperienceLevel,
      position: setPosition,
      role: setRole,
      company: setCompany,
    };
    stateSetters[filterKey]?.(filterValue);
    updateSearchParams({ [filterKey]: filterValue });
  };

  const clearAllFilters = () => {
    setSearchTerm({});
    setCategory('');
    setLocation('');
    setExperienceLevel('');
    setPosition('');
    setRole('');
    setCompany('');
    setSearchInput('');
    setSearchParams({});
  };

  const clearSpecificFilter = (
    filterType: 'category' | 'location' | 'experienceLevel' | 'search'
  ) => {
    const newSearchParams = new URLSearchParams(searchParams);

    switch (filterType) {
      case 'category':
        newSearchParams.delete('category');
        setCategory('');
        break;
      case 'location':
        newSearchParams.delete('location');
        setLocation('');
        break;

      case 'experienceLevel':
        newSearchParams.delete('experienceLevel');
        setLocation('');
        break;

      case 'search':
        newSearchParams.delete('postion');
        newSearchParams.delete('role');
        newSearchParams.delete('company');
        setSearchTerm({});
        setSearchInput('');
        setPosition('')
        setRole('')
        setCompany('')
        break;

      default:
        break;
    }

    setSearchParams(newSearchParams);
  };
  const clearSearchFilter = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    ['role', 'position', 'company'].forEach((key) =>
      newSearchParams.delete(key)
    );
    setSearchParams(newSearchParams);
    setSearchTerm({});
    setSearchInput('');
  };

  const isAnyFilterApplied = Array.from(searchParams.values()).some(
    (value) => value !== ''
  );
  useEffect(() => {
    const urlCategory = searchParams.get('category') || '';
    const urlLocation = searchParams.get('location') || '';
    const urlExperienceLevel = searchParams.get('experienceLevel') || '';
    const urlRole = searchParams.get('role') || '';
    const urlPosition = searchParams.get('position') || '';
    const urlCompany = searchParams.get('company') || '';
    setCategory(urlCategory);
    setLocation(urlLocation);
    setExperienceLevel(urlExperienceLevel);
    setRole(urlRole);
    setCompany(urlCompany);
    setPosition(urlPosition);
  }, [searchParams]);

  return (
    <JobFilterContext.Provider
      value={{
        category,
        location,
        experienceLevel,
        position,
        company,
        role,
        searchTerm,
        setSearchInput,
        searchInput,
        searchKey: Object.keys(searchTerm)[0] || '',
        searchValue: searchTerm[Object.keys(searchTerm)[0]] || '',
        isAnyFilterApplied,
        clearAllFilters,
        clearSpecificFilter,
        handleSearchTermChange,
        handleFilterChange,
        clearSearchFilter,
      }}
    >
      {children}
    </JobFilterContext.Provider>
  );
};

export { JobFilterProvider, JobFilterContext };
