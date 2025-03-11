import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Outlet } from 'react-router-dom';
import styles from '../styles/Layout.module.css';
import BackToTopButton from '../components/common/BackToTopButton';
import MobileMenu from '../components/layout/MobileMenu';
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
