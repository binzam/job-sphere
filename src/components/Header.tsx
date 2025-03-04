import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/Header.module.css';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { useState } from 'react';
import MobileMenu from './MobileMenu';
import { ImSphere } from 'react-icons/im';
const Header = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const staticHeader = location.pathname.startsWith('/jobs');

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  return (
    <header className={`${styles.header} ${staticHeader && styles.static}`}>
      <div className={styles.header_wrapper}>
        <button className={styles.menu_btn} onClick={toggleModal}>
          <HiOutlineMenuAlt2 />
        </button>
        <div className={styles.logo}>
          <Link to="/">
            <div className={styles.logo_link}>
              <ImSphere />
              JOB SPHERE
            </div>
          </Link>
        </div>
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
      <MobileMenu isOpen={isModalOpen} onClose={toggleModal} />
    </header>
  );
};

export default Header;
