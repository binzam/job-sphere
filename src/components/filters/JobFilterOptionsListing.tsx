import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/JobCategoryListing.module.css';
import { handleDropdownKeyDown } from '../../utils/keyboardUtils';

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
  const [focusedIndex, setFocusedIndex] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setFocusedIndex(0);
  }, [listing]);
  

  return (
    <div className={styles.dropdown} role="menu">
      <ul
        className={styles.dropdownMenu}
        ref={listRef}
        tabIndex={0}
        onKeyDown={(event) =>
          handleDropdownKeyDown(
            event,
            listing,
            focusedIndex,
            setFocusedIndex,
            onOptionSelect,
            onClose
          )
        }
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            onClose?.();
          }
        }}
      >
        {listing.map((option, index) => (
          <li
            key={option}
            className={`${styles.dropdownItem} ${
              focusedIndex === index ? styles.focused : ''
            }`}
            onClick={() => {
              onOptionSelect?.(option);
              onClose?.();
            }}
            tabIndex={-1}
            aria-selected={focusedIndex === index}
          >
            <p>{option}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobFilterOptionsListing;
