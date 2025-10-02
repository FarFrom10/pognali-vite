import styles from './transport-icons-mini.module.scss';
import { transportConfig } from '../../../const/const';
import { TransportId } from '../../../types/form';

type Props = {
  withBorder?: boolean;
  activeTransport: string;
};

const transportAlias: Record<string, TransportId> = {
  авиаперелет: 'plane',
  самолет: 'plane',
  авиарейс: 'plane',
  автобус: 'bus',
  автотранспорт: 'bus',
  велосипед: 'bike',
  вело: 'bike',
  пешком: 'foot',
  ходьба: 'foot',
};

function TransportIconsMini({
  withBorder = false,
  activeTransport,
}: Props) {
  const transportTypes: TransportId[] = ['plane', 'bus', 'bike', 'foot'];

  // Нормализуем строку (убираем пробелы, приводим к нижнему регистру)
  const normalized = activeTransport.trim().toLowerCase();
  const normalizedId = transportAlias[normalized];

  return (
    <div
      className={`${styles.transportIconsWrapper} ${
        withBorder ? styles.withBorder : ''
      }`}
    >
      <div className={styles.iconsContainer}>
        {transportTypes.map((id) => {
          const config = transportConfig[id];
          if (!config) {
            return null;
          }

          const isActive = normalizedId === id;

          return (
            <div
              key={id}
              className={`${styles.iconWrapper} ${
                isActive ? styles.active : ''
              }`}
            >
              <div className={styles.icon}>
                <img
                  src={config.icon}
                  alt={config.label}
                  style={{ opacity: isActive ? 1 : 0.15 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TransportIconsMini;
