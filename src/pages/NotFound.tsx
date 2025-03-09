import { Link } from 'react-router-dom';
import styles from  '../styles/About.module.css';
import { RxCircleBackslash } from 'react-icons/rx';
const NotFound = () => {
  return (
    <div className={styles.page_not_found}>
      <h1>
        Page N<RxCircleBackslash />t Found
      </h1>
      <Link to="/">Go to Home Page</Link>
    </div>
  );
};

export default NotFound;
