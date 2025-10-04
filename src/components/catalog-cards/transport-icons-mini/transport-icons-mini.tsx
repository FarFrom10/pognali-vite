import styles from './transport-icons-mini.module.scss';
import { transportConfig } from '../../../const/const';
import { TransportType } from '../../../types/transport-type.enum';

type Props = {
  withBorder?: boolean;
  activeTransport: string; // строка из сервера, например "Самолет"
};

function TransportIconsMini({
  withBorder = false,
  activeTransport,
}: Props) {
  // Получаем ключи enum как массив типов TransportType
  const transportTypes = Object.keys(TransportType) as Array<keyof typeof TransportType>;

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

          // Сравниваем значение enum с activeTransport
          const isActive = String(TransportType[id]) === String(activeTransport);

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
