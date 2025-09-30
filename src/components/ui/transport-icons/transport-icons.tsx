import { useState } from 'react';
import styles from './transport-icons.module.scss';
import PlaneIcon from '/images/assets/icons/icon-plane.svg';
import BusIcon from '/images/assets/icons/icon-bus.svg';
import BikeIcon from '/images/assets/icons/icon-bike.svg';
import FootIcon from '/images/assets/icons/icon-foot.svg';
import Tooltip from '../tooltip/tooltip';

const transportConfig = {
  plane: { icon: PlaneIcon, label: 'Авиаперелет' },
  bus: { icon: BusIcon, label: 'Автотранспорт' },
  bike: { icon: BikeIcon, label: 'Велосипед' },
  foot: { icon: FootIcon, label: 'Пешком' },
};

type TransportId = keyof typeof transportConfig;
// "plane" | "bus" | "bike" | "foot"

type Props = {
  transportTypes?: TransportId[];
  label?: string;
  withBorder?: boolean;
  className?: string;
  onChange?: (active: TransportId[]) => void;
};

const TransportIcons = ({
  transportTypes = ['plane', 'bus', 'bike', 'foot'],
  label = 'Транспорт',
  withBorder = false,
  className = '',
  onChange,
}: Props) => {
  const [active, setActive] = useState<TransportId[]>([]);
  const [hovered, setHovered] = useState<TransportId | null>(null);

  const toggleTransport = (id: TransportId) => {
    const updated = active.includes(id)
      ? active.filter((t) => t !== id)
      : [...active, id];
    setActive(updated);
    onChange?.(updated);
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

          const isActive = active.includes(id);
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
