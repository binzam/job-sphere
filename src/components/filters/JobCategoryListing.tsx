import { Link } from 'react-router-dom';
import { JobCategory } from '../../interfaces';
import styles from '../../styles/JobCategoryListing.module.css';
import { useEffect, useRef, useState } from 'react';
import { handleDropdownKeyDown } from '../../utils/keyboardUtils';
interface JobCategoryListingProps {
  listing: JobCategory[];
  isDropdown?: boolean;
  onCategorySelect?: (category: string) => void;
  onClose?: () => void;
}

const JobCategoryListing: React.FC<JobCategoryListingProps> = ({
  listing,
  isDropdown = false,
  onCategorySelect,
  onClose,
}) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    setFocusedIndex(0);
  }, [listing]);

  if (isDropdown && onClose) {
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
              (category) => onCategorySelect?.(category.title),
              onClose
            )
          }
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              onClose();
            }
          }}
        >
          {listing.map((sector, index) => (
            <li
              key={sector.title}
              className={`${styles.dropdownItem} ${
                focusedIndex === index ? styles.focused : ''
              }`}
              onClick={() => {
                onCategorySelect?.(sector.title);
                onClose?.();
              }}
              tabIndex={-1}
              aria-selected={focusedIndex === index}
            >
              <img src={sector.icon} alt={sector.title} /> <p>{sector.title}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div className={styles.job_category_list}>
      {listing.map((sector) => (
        <div className={styles.category_card_wrap} key={sector.title}>
          <Link to={`/jobs?category=${sector.title}`}>
            <article className={styles.category_card}>
              <h3>{sector.title}</h3>
              <img src={sector.icon} alt="" />
              <p>{sector.count} Jobs</p>
            </article>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default JobCategoryListing;
