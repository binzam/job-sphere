import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/Header.module.css';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { useState } from 'react';
import MobileMenu from './MobileMenu';
import { ImSphere } from 'react-icons/im';
import { MdLogout } from 'react-icons/md';
import { useUser } from '../hooks/useUser';
const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const staticHeader = location.pathname.startsWith('/jobs');

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
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
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/jobs">Find jobs</Link>
            </li>
            <li>
              <Link to="/contact">Contact us</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
          {!user ? (
            <ul className={styles.nav_list}>
              <li>
                <Link to="/auth/sign-in">Sign In</Link>
              </li>
              <li>
                <Link to="/auth/join">Register</Link>
              </li>
            </ul>
          ) : (
            <button className={styles.logout_btn} onClick={handleLogout}>
              <MdLogout />Sign out
            </button>
          )}
        </nav>
      </div>
      <MobileMenu isOpen={isModalOpen} onClose={toggleModal} />
    </header>
  );
};

export default Header;
