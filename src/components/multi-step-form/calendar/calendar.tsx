import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { DayPicker } from 'react-day-picker';
import styles from './calendar.module.css';
import { FormValues } from '../../../types/form';
import { ru } from 'date-fns/locale';
import { useCallback } from 'react';


function Calendar() {
  const { control } = useFormContext<FormValues>();

  // наблюдаем за dateRange вне render-пропа Controller
  const watchedRange = useWatch({ control, name: 'dateRange' });

  // модификатор должен всегда возвращать boolean — ни null, ни undefined
  const tentativeStart = useCallback(
    (day: Date): boolean => {
      const from = watchedRange?.from ?? null;
      const to = watchedRange?.to ?? null;

      // если нет выбранного "from" — это не tentative start
      if (!from) {
        return false;
      }
      // если уже есть to (диапазон завершён) — не tentative
      if (to) {
        return false;
      }

      // сравниваем дни по getTime()
      return day.getTime() === from.getTime();
    },
    [watchedRange]
  );

  return (
    <div className={styles.calendarWrapper}>
      <Controller
        name="dateRange"
        control={control}
        render={({ field }) => (
          <DayPicker
            locale={ru}
            min={1}
            max={31}
            disabled={{ before: new Date() }}
            navLayout='around'
            mode="range"
            selected={
              field.value.from || field.value.to
                ? {
                  from: field.value.from ?? undefined,
                  to: field.value.to ?? undefined,
                }
                : undefined
            }
            onSelect={(range) =>
              field.onChange({
                from: range?.from ?? null,
                to: range?.to ?? null,
              })}
            weekStartsOn={1}
            showOutsideDays
            modifiers={{ tentativeStart }}
            modifiersClassNames={{
              // ключ — имя модификатора, значение — CSS-класс (можно переиспользовать styles.rangeStart)
              tentativeStart: styles.rangeStart,
            }}
            classNames={{
              root: styles.root,
              month: styles.month,
              month_grid: styles.monthGrid,
              month_caption: styles.monthCaption,
              weekdays: styles.weekdays,
              weekday: styles.weekday,
              week: styles.week,
              day: styles.day,
              day_button: styles.dayButton,
              outside: styles.outside,
              selected: styles.selected,
              range_start: styles.rangeStart,
              range_middle: styles.rangeMiddle,
              range_end: styles.rangeEnd,
              button_previous: styles.buttonPrevious,
              button_next: styles.buttonNext,
            }}
          />
        )}
      />
    </div>
  );
}

export default Calendar;
