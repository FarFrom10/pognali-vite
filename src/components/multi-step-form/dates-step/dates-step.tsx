import { Controller, useFormContext } from 'react-hook-form';
import Counter from '../counter/counter';
import styles from './dates-step.module.css';
import Calendar from '../calendar/calendar';
import { ValidNumbers } from '../../../const/const';

function DatesStep() {
  const { control } = useFormContext();

  return (
    <div className={styles.datesWrapper}>
      <div className={styles.controls}>
        <div className={styles.counters}>
          <Counter control={control} name="peopleAmount" label="Ищу попутчиков" unit='чел'
            min={ValidNumbers.People.min}
            max={ValidNumbers.People.max}
          />
          <Counter control={control} name="duration" label="Длительность" unit='дн'
            min={ValidNumbers.Duration.min}
            max={ValidNumbers.Duration.max}
          />
        </div>
        <div className={styles.checkboxContainer}>
          <Controller
            name="isChildrenAllowed"
            control={control}
            render={({ field }) => (
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  {...field}
                  checked={Boolean(field.value) || false}
                  className={styles.hiddenCheckbox}
                />
                <span className={styles.customCheckbox} />
                <span className={styles.checkboxText}>Можно с детьми</span>
              </label>
            )}
          />
        </div>
      </div>
      <Calendar />
    </div>

  );
}

export default DatesStep;
