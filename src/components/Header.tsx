import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <header className={styles.header}>
      <div className={styles.header_wrapper}>
        <button className={styles.menu_btn} onClick={toggleModal}>
          <HiOutlineMenuAlt2 />
        </button>
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
      <div
        className={`${styles.mobile_menu} ${isModalOpen ? styles.open : ''}`}
      >
        <button className={styles.close_btn} onClick={toggleModal}>
          <IoMdClose />
        </button>
        <ul className={styles.mobile_nav_list}>
          <li>
            <Link to="/jobs" onClick={toggleModal}>
              Find jobs
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={toggleModal}>
              Contact us
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={toggleModal}>
              Add Jobs
            </Link>
          </li>
          <li>
            <Link to="/sign-in" onClick={toggleModal}>
              Sign In
            </Link>
          </li>
          <li>
            <Link to="/join" onClick={toggleModal}>
              Register
            </Link>
          </li>
        </ul>
      </div>

      {isModalOpen && (
        <div className={styles.overlay} onClick={toggleModal}></div>
      )}
    </header>
  );
};

export default Header;
