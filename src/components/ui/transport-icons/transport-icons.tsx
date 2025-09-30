import { useState } from 'react';
import styles from './transport-icons.module.scss';
import Tooltip from '../tooltip/tooltip';
import { TransportId } from '../../../types/form';
import { transportConfig } from '../../../const/const';

type Props = {
  value: TransportId[];
  onChange: (active: TransportId[]) => void;
  transportTypes?: TransportId[];
  label?: string;
  withBorder?: boolean;
  className?: string;
};

const TransportIcons = ({
  value,
  transportTypes = ['plane', 'bus', 'bike', 'foot'],
  label = 'Транспорт',
  withBorder = false,
  className = '',
  onChange,
}: Props) => {
  const [hovered, setHovered] = useState<TransportId | null>(null);

  const toggleTransport = (id: TransportId) => {
    const updated = value.includes(id)
      ? value.filter((t) => t !== id)
      : [...value, id];
    onChange(updated);
  };

  return (
    <div
      className={`${styles.transportIconsWrapper} ${withBorder ? styles.withBorder : ''} ${className}`}
    >
      {label && <span className={styles.label}>{label}</span>}

      <div className={styles.iconsContainer}>
        {transportTypes.map((id) => {
          const config = transportConfig[id];
          if (!config) {
            return null;
          }

          const isActive = value.includes(id);
          const isHovered = hovered === id;

          return (
            <button
              key={id}
              type="button"
              className={`${styles.iconWrapper} ${isActive ? styles.active : ''}`}
              onClick={() => toggleTransport(id)}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className={styles.icon}>
                <img
                  src={config.icon}
                  alt={config.label}
                  style={{ opacity: isActive ? 0.15 : 1 }}
                />
              </div>

              <Tooltip content={config.label} isVisible={isHovered} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TransportIcons;
