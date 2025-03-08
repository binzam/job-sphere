import { Link, useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import styles from '../styles/MobileMenu.module.css';
import { ImSphere } from 'react-icons/im';
import { useUser } from '../hooks/useUser';
import { MdLogout } from 'react-icons/md';
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
    onClose();
  };
  return (
    <>
      <div className={`${styles.mobile_menu} ${isOpen ? styles.open : ''}`}>
        <div className={styles.mobile_menu_content}>
          <button className={styles.close_btn} onClick={onClose}>
            <IoMdClose />
          </button>
          <ul className={styles.mobile_nav_list}>
            <li>
              <Link to="/home" onClick={onClose}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/jobs" onClick={onClose}>
                Find jobs
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={onClose}>
                Contact us
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={onClose}>
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
                  onClick={onClose}
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/join"
                  className={styles.mob_nav_sign_up}
                  onClick={onClose}
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
            <ImSphere />
            Job Sphere
          </span>
        </div>
      </div>
      {isOpen && (
        <div
          className={`${styles.overlay} ${styles.show}`}
          onClick={onClose}
        ></div>
      )}
    </>
  );
};

export default MobileMenu;
