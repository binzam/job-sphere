import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import styles from '../styles/Layout.module.css';
import BackToTopButton from '../components/BackToTopButton';
import MobileMenu from '../components/MobileMenu';
import { useUser } from '../hooks/useUser';
const Layout = () => {
  const { isMenuModalOpen } = useUser();
  return (
    <div className={`${styles.App} ${isMenuModalOpen && styles.modal_open}`}>
      <BackToTopButton />
      <Header />
      <MobileMenu />
      <main className={styles.main_content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
