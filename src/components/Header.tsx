import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css';
const Header = () => {
  return (
    <header className={styles.header}>
    <div className={styles.header_wrapper}>
      <h1>
        <Link to="/">JOB SPHERE</Link>
      </h1>
      <nav className={styles.nav}>
        <ul className={styles.nav_list}>
          <li>
            <Link to="/jobs">Find jobs</Link>
          </li>
          <li>
            <Link to="/contact">Contact us</Link>
          </li>
          <li>
            <Link to="/contact">Add Jobs</Link>
          </li>
        </ul>
        <ul className={styles.nav_list}>
          <li>
            <Link to="/sign-in">Sign In</Link>
          </li>
          <li>
            <Link to="/join">Register</Link>
          </li>
        </ul>
      </nav>
    </div>
    </header>
  );
};

export default Header;
