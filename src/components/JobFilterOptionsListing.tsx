import React from 'react';
import styles from '../styles/JobCategoryListing.module.css';

interface JobFilterOptionsListingProps {
  listing: string[];
  onOptionSelect?: (option: string) => void;
  onClose?: () => void;
}

const JobFilterOptionsListing: React.FC<JobFilterOptionsListingProps> = ({
  listing,
  onOptionSelect,
  onClose,
}) => {
  const handleOptionClick = (option: string) => {
    if (onOptionSelect && onClose) {
      onOptionSelect(option);
      onClose();
    }
  };
  return (
    <div className={styles.dropdown}>
      <ul className={styles.dropdownMenu}>
        {listing.map((option) => (
          <li
            key={option}
            className={styles.dropdownItem}
            onClick={() => handleOptionClick(option)}
          >
            <p>{option}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobFilterOptionsListing;
