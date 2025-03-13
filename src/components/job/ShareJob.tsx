import { useEffect, useState } from 'react';
import styles from '../../styles/ShareJob.module.css';
import { FaFacebook, FaLink, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
import { FaShareAlt } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import MessageDisplayCard from '../common/MessageDisplayCard';

interface ShareJobProps {
  jobId: string | number;
  jobCategory: string;
}

const ShareJob = ({ jobCategory, jobId }: ShareJobProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [jobUrl, setJobUrl] = useState('');
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setJobUrl(`${window.location.origin}/jobs/${jobCategory}/${jobId}`);
    }
  }, [jobCategory, jobId]);

  const shareToSocialMedia = (platform: string) => {
    if (!jobUrl) return;

    const urls: { [key: string]: string } = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        jobUrl
      )}`,
      x: `https://x.com/intent/post?url=${encodeURIComponent(jobUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(jobUrl)}`,
      email: `mailto:?subject=Check out this job&body=${encodeURIComponent(
        jobUrl
      )}`,
    };

    window.open(urls[platform], '_blank');
  };
  const copyToClipboard = () => {
    if (!jobUrl) return;
    navigator.clipboard.writeText(jobUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className={styles.share_job}>
      <button
        className={`${styles.share_btn} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle share options"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <span className={styles.share_btn_txt}>Share Job</span>{' '}
        <FaShareAlt className={styles.share_icon} />
      </button>
      {isOpen && (
        <div className={styles.share_buttons}  role="menu">
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
          <button
            title="Copy Link"
            onClick={copyToClipboard}
            aria-label="Copy Link"
          >
            <FaLink className={styles.icon_copy} />
          </button>
        </div>
      )}
      {copied && (
        <MessageDisplayCard
          autoHide
          type="success"
          message="Link Copied."
          bottom
          aria-live="assertive"
        />
      )}
    </div>
  );
};

export default ShareJob;
