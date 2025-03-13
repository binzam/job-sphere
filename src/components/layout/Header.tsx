import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../styles/Header.module.css';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { MdLogout } from 'react-icons/md';
import { useUser } from '../../hooks/useUser';
// import { SiQuicklook } from 'react-icons/si';
const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, toggleMenuModal } = useUser();

  const staticHeader = location.pathname.startsWith('/jobs');

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };
  return (
    <header className={`${styles.header} ${staticHeader && styles.static}`}>
      <div className={styles.header_wrapper}>
        <button className={styles.menu_btn} onClick={toggleMenuModal}>
          <HiOutlineMenuAlt2 />
        </button>
        <div className={styles.logo}>
          <Link to="/">
            <div className={styles.logo_link}>
             {/* <SiQuicklook /> */}
              <img src='/assets/images/briefcase-icon.svg' alt="Job Sphere" />
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
            <ul className={styles.nav_list_auth}>
              <li>
                <Link to="/auth/sign-in" className={styles.sign_in}>
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/auth/join" className={styles.sign_up}>
                  Register
                </Link>
              </li>
            </ul>
          ) : (
            <button className={styles.logout_btn} onClick={handleLogout}>
              <MdLogout />
              Sign out
            </button>
          )}
        </nav>
      </div>
      
    </header>
  );
};

export default Header;
