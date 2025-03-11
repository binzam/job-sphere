import { Link, useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import styles from '../../styles/MobileMenu.module.css';
import { useUser } from '../../hooks/useUser';
import { MdLogout } from 'react-icons/md';
import { SiQuicklook } from 'react-icons/si';

const MobileMenu: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, isMenuModalOpen, toggleMenuModal } = useUser();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
    toggleMenuModal();
  };
  return (
    <>
      <div
        className={`${styles.mobile_menu} ${
          isMenuModalOpen ? styles.open : ''
        }`}
      >
        <div className={styles.mobile_menu_content}>
          <button className={styles.close_btn} onClick={toggleMenuModal}>
            <IoMdClose />
          </button>
          <ul className={styles.mobile_nav_list}>
            <li>
              <Link to="/" onClick={toggleMenuModal}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/jobs" onClick={toggleMenuModal}>
                Find jobs
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={toggleMenuModal}>
                Contact us
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={toggleMenuModal}>
                About
              </Link>
            </li>
          </ul>
          {!user ? (
            <ul className={styles.mobile_nav_list_auth}>
              <li>
                <Link
                  to="/auth/sign-in"
                  className={styles.mob_nav_sign_in}
                  onClick={toggleMenuModal}
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/join"
                  className={styles.mob_nav_sign_up}
                  onClick={toggleMenuModal}
                >
                  Register
                </Link>
              </li>
            </ul>
          ) : (
            <button
              className={styles.mobile_nav_logout_btn}
              onClick={handleLogout}
            >
              <MdLogout />
              Sign out
            </button>
          )}
          <span className={styles.mobile_menu_ftr}>
            <SiQuicklook />
            Job Sphere
          </span>
        </div>
      </div>
      {isMenuModalOpen && (
        <div
          className={`${styles.overlay} ${styles.show}`}
          onClick={toggleMenuModal}
        ></div>
      )}
    </>
  );
};

export default MobileMenu;
