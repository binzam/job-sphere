import { Link } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import styles from '../styles/MobileMenu.module.css';
import { ImSphere } from 'react-icons/im';
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <div className={`${styles.mobile_menu} ${isOpen ? styles.open : ''}`}>
        <div className={styles.mobile_menu_content}>
          <button className={styles.close_btn} onClick={onClose}>
            <IoMdClose />
          </button>
          <ul className={styles.mobile_nav_list}>
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
              <Link to="/contact" onClick={onClose}>
                Add Jobs
              </Link>
            </li>
            <li>
              <Link to="/sign-in" onClick={onClose}>
                Sign In
              </Link>
            </li>
            <li>
              <Link to="/join" onClick={onClose}>
                Register
              </Link>
            </li>
          </ul>
          <span className={styles.mobile_menu_ftr}><ImSphere />Job Sphere</span>
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
