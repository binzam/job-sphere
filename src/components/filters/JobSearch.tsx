import styles from '../../styles/JobSearch.module.css';
import { Job } from '../../interfaces';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { IoSearch } from 'react-icons/io5';
import { useJobFilters } from '../../hooks/useJobFilters';

type JobSearchProps = {
  jobs: Job[];
  onSearchSelect?: (searchParams: { [key: string]: string }) => void;
  layoutType?: string;
};

const JobSearch: React.FC<JobSearchProps> = ({
  jobs,
  onSearchSelect,
  layoutType,
}) => {
  const {
    handleSearchTermChange,
    clearSearchFilter,
    searchInput,
    setSearchInput,
  } = useJobFilters();
  const [suggestions, setSuggestions] = useState<
    { key: string; label: string }[]
  >([]);
  const addStyle = layoutType === 'hero' ? styles.hero : styles.filter;
  const handleSearchTermInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.trim();
    setSearchInput(value);

    if (!value) {
      setSuggestions([]);
      return;
    }

    const lowerValue = value.toLowerCase();

    const matchingJobs = jobs.flatMap(({ role, company, position }) => {
      return [
        role &&
          role.toLowerCase().includes(lowerValue) && {
            key: 'role',
            label: role,
          },
        company &&
          company.toLowerCase().includes(lowerValue) && {
            key: 'company',
            label: company,
          },
        position &&
          position.toLowerCase().includes(lowerValue) && {
            key: 'position',
            label: position,
          },
      ].filter(Boolean) as { key: string; label: string }[];
    });

    const uniqueSuggestions = Array.from(
      new Map(matchingJobs.map((item) => [item.label, item])).values()
    );
    setSuggestions(uniqueSuggestions);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSuggestions([]);
    clearSearchFilter();
  };

  const handleSuggestionClick = (value: string, key: string) => {
    clearSearchFilter();
    setSearchInput(value);
    setSuggestions([]);
    handleSearchTermChange({ [key]: value });
    if (onSearchSelect) onSearchSelect({ [key]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    handleSearchTermChange({ searchInput });
  };
  return (
    <div className={`${styles.search_bar_container} ${addStyle}`}>
      <form
        className={`${styles.search_form} ${addStyle}`}
        onSubmit={handleSubmit}
      >
        <label htmlFor="search"></label>
        <input
          className={` ${styles.search_input} ${addStyle} ${
            searchInput ? styles.active : ''
          }`}
          id="search"
          type="text"
          value={searchInput}
          placeholder="Search position, company, role ..."
          onChange={handleSearchTermInputChange}
        />
        {searchInput ? (
          <button
            type="button"
            className={`${styles.search_btn} ${styles.clear} ${addStyle}`}
            onClick={handleClearSearch}
          >
            <MdClose />
          </button>
        ) : (
          <button type="submit" className={`${styles.search_btn} ${addStyle}`}>
            <IoSearch />
          </button>
        )}
      </form>
      {suggestions.length > 0 && (
        <ul className={` ${styles.search_result_dropdown}`}>
          <li className={styles.results_ttl}>Search Results</li>
          {suggestions.map(({ key, label }, index) => (
            <li
              key={index}
              className={styles.search_result_item}
              onClick={() => handleSuggestionClick(label, key)}
            >
              <span className={styles.result_label}>'{label}'</span>{' '}
              <span className={styles.result_key}>{key}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobSearch;
