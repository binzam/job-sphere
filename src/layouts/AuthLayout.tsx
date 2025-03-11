import { Outlet } from 'react-router-dom';
import styles from '../styles/Layout.module.css';
import Footer from '../components/layout/Footer';
import { ImSphere } from 'react-icons/im';
const AuthLayout = () => {
  return (
    <div className={styles.App}>
      <header className={styles.auth_header}>
        <div className={styles.logo}>
          <ImSphere />
          JOB SPHERE
        </div>
      </header>
      <main className={styles.main_content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
