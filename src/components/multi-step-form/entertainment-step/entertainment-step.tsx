import { useFormContext } from 'react-hook-form';
import styles from './entertainment-step.module.css';
import { getFlagForCountry } from '../../../utils/country-flags';
import { FormValues } from '../../../schemas/form-schema';
import { ValidNumbers } from '../../../const/const';

function EntertainmentStep() {
  const { watch } = useFormContext<FormValues>();
  const countries = watch('countries'); // берем список выбранных стран
  const filteredCountries = countries?.filter((c) => c.value.trim());

  return (
    <div className={styles.wrapper}>
      {!filteredCountries.length &&
      <div className={styles.emptyCountries}>Выберите страну на предыдущем шаге</div>}

      {filteredCountries.map((c) => (
        <div key={c.value} className={styles.countryBlock}>
          <div className={styles.header}>
            <h4>{c.value}</h4>
            {getFlagForCountry(c.value) && (
              <img
                src={getFlagForCountry(c.value)}
                alt={`Флаг ${c.value}`}
                className={styles.flag}
              />
            )}
          </div>
          <textarea
            maxLength={ValidNumbers.CommentLength.max}
            placeholder="План действий"
            className={styles.textarea}
          />
        </div>
      ))}
    </div>
  );
}

export default EntertainmentStep;
