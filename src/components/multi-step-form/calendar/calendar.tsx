import { Controller, useFormContext } from 'react-hook-form';
import { DayPicker } from 'react-day-picker';
import styles from './calendar.module.css';
import { FormValues } from '../../../types/form';

function Calendar() {
  const { control } = useFormContext<FormValues>();

  return (
    <div className={styles.calendarWrapper}>
      <Controller
        name="dateRange"
        control={control}
        render={({ field }) => (
          <DayPicker
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
            }}
          />
        )}
      />
    </div>
  );
}

export default Calendar;
