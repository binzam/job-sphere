import { useEffect, useState } from 'react';
import styles from '../styles/ShareJob.module.css';
import { FaFacebook, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
import { FaShareAlt } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

interface ShareJobProps {
  jobId: string | number;
  jobCategory: string;
}

const ShareJob = ({ jobCategory, jobId }: ShareJobProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [jobUrl, setJobUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setJobUrl(`${window.location.origin}/jobs/${jobCategory}/${jobId}`);
    }
  }, [jobCategory, jobId]);

  const shareToSocialMedia = (platform: string) => {
    if (!jobUrl) return;

    switch (platform) {
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            jobUrl
          )}`,
          '_blank'
        );
        break;
      case 'x':
        window.open(
          `https://x.com/intent/post?url=${encodeURIComponent(jobUrl)}`,
          '_blank'
        );
        break;
      case 'whatsapp':
        window.open(
          `https://wa.me/?text=${encodeURIComponent(jobUrl)}`,
          '_blank'
        );
        break;
      case 'email':
        window.open(
          `mailto:?subject=Check out this job&body=${encodeURIComponent(
            jobUrl
          )}`,
          '_blank'
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.share_job}>
      <button
        className={`${styles.share_btn} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle share options"
      >
        <span className={styles.share_btn_txt}>Share Job</span>{' '}
        <FaShareAlt className={styles.share_icon} />
      </button>
      {isOpen && (
        <div className={styles.share_buttons}>
          <button
            title="Share on Facebook"
            onClick={() => shareToSocialMedia('facebook')}
            aria-label="Share on Facebook"
          >
            <FaFacebook className={styles.icon_fb} />
          </button>
          <button
            title="Share on Twitter/X"
            onClick={() => shareToSocialMedia('x')}
            aria-label="Share on Twitter/X"
          >
            <FaXTwitter className={styles.icon_x} />
          </button>
          <button
            title="Share on WhatsApp"
            onClick={() => shareToSocialMedia('whatsapp')}
            aria-label="Share on WhatsApp"
          >
            <FaWhatsapp className={styles.icon_wa} />
          </button>
          <button
            title="Share via Email"
            onClick={() => shareToSocialMedia('email')}
            aria-label="Share via Email"
          >
            <SiGmail className={styles.icon_mail} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareJob;
