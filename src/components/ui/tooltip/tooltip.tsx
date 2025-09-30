import styles from './tooltip.module.scss';

type Props = {
  content: import('react').ReactNode;
  isVisible: boolean;
}

const Tooltip = ({ content, isVisible }: Props) => {
  if (!isVisible || !content) {
    return null;
  }

  return (
    <div className={styles.tooltip}>
      {content}
      <div className={styles.arrow}></div>
    </div>
  );
};

export default Tooltip;
