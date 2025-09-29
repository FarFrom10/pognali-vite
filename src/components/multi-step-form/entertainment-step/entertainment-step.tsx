import { useFormContext } from 'react-hook-form';
import { FormValues } from '../../../types/form';
import styles from './entertainment-step.module.css';
import { getFlagForCountry } from '../../../utils/country-flags';

function EntertainmentStep() {
  const { register, watch } = useFormContext<FormValues>();
  const countries = watch('countries'); // берем список выбранных стран
  const filteredCountries = countries?.filter((c) => c.value.trim());

  return (
    <div className={styles.wrapper}>
      {!filteredCountries.length &&
      <div>Выберите страну на предыдущем шаге</div>}

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
            {...register(`comments.${c.value}`, {
              maxLength: {
                value: 200,
                message: 'Не более 200 символов',
              },
            })}
            placeholder="План действий"
            className={styles.textarea}
          />
        </div>
      ))}
    </div>
  );
}

export default EntertainmentStep;
