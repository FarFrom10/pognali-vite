import { Companion } from '../../../schemas/companion.schema';
import { TransportType } from '../../../types/transport-type.enum';
import { getFlagForCountry } from '../../../utils/country-flags';
import { getRandomImage } from '../../../utils/random-img';
import styles from './card.module.scss';

type Props = {
  companion: Companion;
};

function Card({ companion }: Props) {
  const {
    firstName,
    lastName,
    likes,
    countries,
    hobbies,
    transportType,
    level,
  } = companion;

  //Случайное изображение, так как на сервере их нет
  const randomAvatar = getRandomImage();

  const fullName = `${firstName} ${lastName}`;

  const uniqueHobbies = [...new Set(hobbies)];

  // Транспорт: простая мапа enum → emoji
  const transportIcons: Record<TransportType, string> = {
    [TransportType.AIRPLANE]: '✈️',
    [TransportType.BUS]: '🚌',
    [TransportType.BICYCLE]: '🚴',
    [TransportType.WALKING]: '🏃',
  };

  return (
    <div className={styles.card}>
      {/* Фото */}
      <div className={styles.photo}>
        <img src={randomAvatar} alt={fullName} />
      </div>

      {/* Контент */}
      <div className={styles.info}>
        <h2 className={styles.name}>{fullName}</h2>

        {hobbies.length > 0 && (
          <p className={styles.tags}>
            {uniqueHobbies.map((hobby) => (
              <span key={hobby}>#{hobby} </span>
            ))}
          </p>
        )}

        <div className={styles.countries}>
          {countries.map((country) => (
            <div key={country} className={styles.country}>
              {/* Если есть мапа флагов → подставить */}
              <img src={getFlagForCountry(country)} className={styles.flag}/>
              {country}
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <div className={styles.callBtn}>ПОЗВАТЬ!</div>
          <span className={styles.likes}>{likes}</span>
        </div>

        <div className={styles.footer}>
          <div className={styles.icons}>
            <span>{transportIcons[transportType]}</span>
          </div>
          <div className={styles.level}>
            {level} <span>level</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
