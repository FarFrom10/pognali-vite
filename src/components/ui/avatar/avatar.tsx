import styles from './avatar.module.scss';

type Props = {
  src: string;
  alt?: string;
  width: number;
  height: number;
  borderRadius: number;
  className?: string;
}

const Avatar = ({
  src,
  alt = 'Аватар',
  width = 220,
  height = 237,
  borderRadius = 24,
  className = ''
}: Props) => (
  <div
    className={`${styles.avatarWrapper} ${className}`}
    style={{
      width: `${width}px`,
      height: `${height}px`,
      borderRadius: `${borderRadius}px`
    }}
  >
    <img src={src} alt={alt} />
  </div>
);

export default Avatar;
