import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa6';
import styles from '../../styles/BackToTopButton.module.css';
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className={styles.back_to_top}>
      {isVisible && (
        <button onClick={scrollToTop} className={styles.back_to_top_button}>
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default BackToTopButton;
