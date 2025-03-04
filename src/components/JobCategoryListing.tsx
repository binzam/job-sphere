import { Link } from 'react-router-dom';
import { JobCategory } from '../interfaces';
import styles from '../styles/JobCategoryListing.module.css';
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
  const handleCategoryClick = (category: string) => {
    if (onCategorySelect && onClose) {
      onCategorySelect(category);
      onClose();
    }
  };

  if (isDropdown && onClose) {
    return (
      <div className={styles.dropdown}>
        <ul className={styles.dropdownMenu}>
          {listing.map((sector) => (
            <li
              key={sector.title}
              className={styles.dropdownItem}
              onClick={() => handleCategoryClick(sector.title)}
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
