import styles from '../styles/JobCategoryListing.module.css';

interface JobLocationListingProps {
  listing: string[];
  onLocationSelect?: (location: string) => void;
  onClose?: () => void;
}

const JobLocationListing: React.FC<JobLocationListingProps> = ({
  listing,
  onLocationSelect,
  onClose,
}) => {
  const handleLocationClick = (location: string) => {
    if (onLocationSelect && onClose) {
      onLocationSelect(location);
      onClose();
    }
  };
  return (
    <div className={styles.dropdown}>
      <ul className={styles.dropdownMenu}>
        {listing.map((location) => (
          <li
            key={location}
            className={styles.dropdownItem}
            onClick={() => handleLocationClick(location)}
          >
            {/* <img src={sector.icon} alt={sector.title} />{' '} */}
            <p>{location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobLocationListing;
