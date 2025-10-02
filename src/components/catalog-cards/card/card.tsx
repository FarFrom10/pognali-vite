import { Companion } from '../../../schemas/companion.schema';
import { getFlagForCountry } from '../../../utils/country-flags';
import { getRandomImage } from '../../../utils/random-img';
import CommonIcon from '../../common-icon/common-icon';
import LevelCircle from '../../ui/level-circle/level-circle';
import TransportIconsMini from '../transport-icons-mini/transport-icons-mini';
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
    interactionStatus,
  } = companion;

  //Случайное изображение, так как на сервере их нет
  const randomAvatar = getRandomImage();

  const fullName = `${firstName} ${lastName}`;

  const uniqueHobbies = [...new Set(hobbies)];

  return (
    <div className={styles.card}>
      {/* Фото */}
      <div className={styles.photo}>
        <img src={randomAvatar} alt={fullName} />
      </div>

      {/* Контент */}
      <div className={styles.info}>

        <div className={styles.infoHeader}>
          <div className={styles.nameBlock}>
            <h2 className={`${styles.name} ${styles[interactionStatus.toLowerCase()]}`}>{fullName}</h2>
            {hobbies.length > 0 && (
              <p className={styles.tags}>
                {uniqueHobbies.map((hobby) => (
                  <span key={hobby}>#{hobby} </span>
                ))}
              </p>
            )}
          </div>

          <div className={styles.countries}>
            {countries.map((country) => (
              <div key={country} className={styles.country}>
                <img src={getFlagForCountry(country)} className={styles.flag}/>
                {country}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.actions}>
            <button type='button' className={styles.callBtn}>ПОЗВАТЬ!</button>
            <button type='button' className={styles.heart}>
              <CommonIcon name='heart' width={20} height={20}/>
            </button>
            <span className={styles.likes}>{likes}</span>
          </div>

          <div className={styles.footerRight}>
            <TransportIconsMini activeTransport={transportType}/>

            <LevelCircle
              className={styles.levelCard}
              value={level}
              size={60}
              numberColor='#1D2E5B'
              dividerColor='#E6E6E6'
              labelColor='#999999'
              valueFontSize={24}
              labelFontSize={14}
              dividerWidth={34}
              dividerMargin='0'
              dividerMarginTop='0'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
