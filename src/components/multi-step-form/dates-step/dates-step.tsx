import { Controller, useFormContext, useWatch } from 'react-hook-form';
import Counter from '../counter/counter';
import styles from './dates-step.module.css';
import Calendar from '../calendar/calendar';
import { ValidNumbers } from '../../../const/const';
import { addDays, differenceInCalendarDays } from 'date-fns';
import { useEffect } from 'react';
import { FormValues } from '../../../schemas/form-schema';

function DatesStep() {
  const { control, setValue } = useFormContext<FormValues>();
  const min = ValidNumbers.Duration.min;

  const duration = useWatch({ control, name: 'duration' });
  const dateRange = useWatch({ control, name: 'dateRange' });

  // следим за диапазоном и сбрасываем duration, если даты не выбраны
  useEffect(() => {
    const from = dateRange?.from ?? null;
    const to = dateRange?.to ?? null;

    // если нет хотя бы одной даты — duration = 2
    if (!from || !to) {
      if (duration !== min) {
        setValue('duration', min, { shouldDirty: true });
      }
      return;
    }

    // вычисляем длительность диапазона
    const diff = differenceInCalendarDays(to, from) + 1;

    // если длительность не совпадает со счетчиком — обновляем duration
    if (diff !== duration) {
      setValue('duration', diff, { shouldDirty: true });
    }
  }, [dateRange?.from, dateRange?.to, duration, setValue, min]);

  // логика ручного изменения duration
  const handleDurationChange = (newValue: number) => {
    const from = dateRange?.from ?? null;
    const to = dateRange?.to ?? null;

    // если нет обеих выбранных дат — duration фиксируется на 2
    if (!from || !to) {
      setValue('duration', min);
      return;
    }

    const diff = differenceInCalendarDays(to, from) + 1;

    // предотвращаем уменьшение меньше 2 дней
    if (newValue < diff && diff <= min) {
      return;
    }

    // увеличение счётчика → расширяем диапазон на +1 день
    if (newValue > diff) {
      setValue('dateRange', {
        from,
        to: addDays(to, 1),
      });
    }

    // уменьшение → сдвигаем "to" на -1 день, но не меньше 2 дней
    if (newValue < diff && diff > min) {
      setValue('dateRange', {
        from,
        to: addDays(to, -1),
      });
    }

    setValue('duration', newValue, { shouldDirty: true });
  };

  return (
    <div className={styles.datesWrapper}>
      <div className={styles.controls}>
        <div className={styles.controlsInner}>
          <Counter
            control={control}
            name="peopleAmount"
            label="Ищу попутчиков"
            unit="чел"
            min={ValidNumbers.People.min}
            max={ValidNumbers.People.max}
          />

          <div className={styles.checkboxContainer}>
            <Controller
              name="isChildrenAllowed"
              control={control}
              render={({ field }) => (
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className={styles.hiddenCheckbox}
                  />
                  <span className={styles.customCheckbox} />
                  <span className={styles.checkboxText}>Можно с детьми</span>
                </label>
              )}
            />
          </div>
        </div>

        {/* счётчик длительности с запретом на взаимодействие, если даты не выбраны */}
        <Counter
          control={control}
          name="duration"
          label="Длительность"
          unit="дн"
          min={2}
          max={ValidNumbers.Duration.max}
          onManualChange={handleDurationChange}
          disabled={!dateRange?.from || !dateRange?.to} // ← 🔒 ключевая строка
        />
      </div>

      <Calendar />
    </div>
  );
}

export default DatesStep;
