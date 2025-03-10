import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';
import styles from '../styles/Footer.module.css';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_wrapper}>
        <p>© 2025 Job Sphere | All rights reserved.</p>
        <ul className={styles.platform_links}>
          <li>
            <Link to="/privacy-policy">Privacy policy</Link>
          </li>
          <li>
            <Link to="/contact">Contact us</Link>
          </li>
          <li>
            <Link to="/about">About us</Link>
          </li>
        </ul>
        <ul className={styles.social_links}>
          <li>
            <a href="#">
              <FaFacebook className={styles.ftr_icon} />
            </a>
          </li>
          <li>
            <a href="#">
              <FaYoutube className={styles.ftr_icon} />
            </a>
          </li>
          <li>
            <a href="#">
              <FaXTwitter className={styles.ftr_icon} />
            </a>
          </li>
          <li>
            <a href="#">
              <FaInstagram className={styles.ftr_icon} />
            </a>
          </li>
          <li>
            <a href="#">
              <FaLinkedin className={styles.ftr_icon} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
