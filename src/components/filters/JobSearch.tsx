import styles from '../../styles/JobSearch.module.css';
import { Job } from '../../interfaces';
import { useCallback, useRef, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { IoSearch } from 'react-icons/io5';
import { useJobFilters } from '../../hooks/useJobFilters';
import { handleSearchSuggestionsKeyDown } from '../../utils/keyboardUtils';
type Suggestion = { key: string; label: string };
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

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const suggestionsListRef = useRef<HTMLUListElement>(null);
  const addStyle = layoutType === 'hero' ? styles.hero : styles.filter;

  const getSuggestions = useCallback(
    (value: string): Suggestion[] => {
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
        ].filter(Boolean) as Suggestion[];
      });
      return Array.from(
        new Map(matchingJobs.map((item) => [item.label, item])).values()
      );
    },
    [jobs]
  );

  const handleSearchTermInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();
      setSearchInput(value);
      if (!value) {
        setSuggestions([]);
        return;
      }
      setSuggestions(getSuggestions(value));
      setFocusedIndex(-1);
    },
    [getSuggestions, setSearchInput]
  );

  const handleClearSearch = () => {
    setSearchInput('');
    setSuggestions([]);
    setFocusedIndex(-1);
    clearSearchFilter();
  };

  const handleSuggestionClick = useCallback(
    (value: string, key: string) => {
      clearSearchFilter();
      setSearchInput(value);
      setSuggestions([]);
      setFocusedIndex(-1);
      handleSearchTermChange({ [key]: value });
      if (onSearchSelect) onSearchSelect({ [key]: value });
    },
    [clearSearchFilter, handleSearchTermChange, onSearchSelect]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!searchInput.trim()) return;
      handleSearchTermChange({ searchInput });
    },
    [searchInput, handleSearchTermChange]
  );

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowDown' && suggestions.length > 0) {
        e.preventDefault();
        suggestionsListRef.current?.focus();
        setFocusedIndex(0);
      } else {
        handleSearchSuggestionsKeyDown(
          e,
          suggestions,
          focusedIndex,
          setFocusedIndex,
          handleSuggestionClick
        );
      }
    },
    [suggestions, focusedIndex, handleSuggestionClick]
  );

  return (
    <div className={`${styles.search_bar_container} ${addStyle}`}>
      <form
        className={`${styles.search_form} ${addStyle}`}
        onSubmit={handleSubmit}
        role="search"
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
          onKeyDown={handleInputKeyDown}
          aria-autocomplete="list"
          aria-controls="suggestions-list"
          aria-expanded={suggestions.length > 0}
          aria-activedescendant={
            focusedIndex >= 0 ? `suggestion-${focusedIndex}` : ''
          }
        />
        {searchInput ? (
          <button
            type="button"
            className={`${styles.search_btn} ${styles.clear} ${addStyle}`}
            onClick={handleClearSearch}
            tabIndex={0}
            aria-label="Clear search"
          >
            <MdClose />
          </button>
        ) : (
          <button
            type="submit"
            className={`${styles.search_btn} ${addStyle}`}
            tabIndex={0}
            aria-label="Search"
          >
            <IoSearch />
          </button>
        )}
      </form>
      {suggestions.length > 0 && (
        <ul
          className={`${styles.search_result_dropdown}`}
          id="suggestions-list"
          role="listbox"
          tabIndex={0}
          ref={suggestionsListRef}
          onKeyDown={(e) =>
            handleSearchSuggestionsKeyDown(
              e,
              suggestions,
              focusedIndex,
              setFocusedIndex,
              handleSuggestionClick
            )
          }
        >
          <li className={styles.results_ttl} role="presentation">
            Search Results
          </li>
          {suggestions.map(({ key, label }, index) => (
            <li
              id={`suggestion-${index}`}
              key={index}
              className={`${styles.search_result_item} ${
                focusedIndex === index ? styles.focused : ''
              }`}
              onClick={() => handleSuggestionClick(label, key)}
              role="option"
              aria-selected={focusedIndex === index ? 'true' : 'false'}
              tabIndex={-1}
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
