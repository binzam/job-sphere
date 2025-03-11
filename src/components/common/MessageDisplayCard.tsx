import { useEffect, useState } from 'react';
import styles from '../../styles/MessageDisplayCard.module.css';
type MessageDisplayCardProps = {
  message: string;
  type?: 'success' | 'error';
  autoHide?: boolean;
  fixed?: boolean;
  bottom?: boolean;
};
const MessageDisplayCard = ({
  message,
  type = 'success',
  autoHide = false,
  fixed = false,
  bottom = false,
}: MessageDisplayCardProps) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [autoHide]);
  if (!visible) return null;
  return (
    <div
      className={`${styles.message_card} ${styles[type]} ${
        fixed ? styles.fixed : bottom ? styles.bottom : ''
      } `}
    >
      {message}
    </div>
  );
};

export default MessageDisplayCard;
