import styles from './level-circle.module.scss';

interface CSSVariables extends React.CSSProperties {
  '--size'?: string;
  '--stroke'?: string;
  '--circle-color'?: string;
  '--number-color'?: string;
  '--divider-color'?: string;
  '--label-color'?: string;
}


type Props = {
  value?: number;
  size?: number;
  stroke?: number;
  circleColor?: string;
  numberColor?: string;
  dividerColor?: string;
  labelColor?: string;
  className?: string;
}

const LevelCircle = ({
  value = 50,
  size = 60,
  stroke = 3,
  circleColor = 'var(--color-icon-bg-additional)',
  numberColor = 'var(--color-default-white)',
  dividerColor = 'var(--color-default-white)',
  labelColor = 'var(--color-default-white)',
  className = ''
}: Props) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div
      className={`${styles.levelCircle} ${className}`}
      style={{
        '--size': `${size}px`,
        '--stroke': `${stroke}px`,
        '--circle-color': circleColor,
        '--number-color': numberColor,
        '--divider-color': dividerColor,
        '--label-color': labelColor
      } as CSSVariables}
    >
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--circle-color)"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>

      <div className={styles.content}>
        <span className={styles.value}>{value}</span>
        <span className={styles.label}>Level</span>
      </div>
    </div>
  );
};

export default LevelCircle;
