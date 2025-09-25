import { Controller, useFormContext } from 'react-hook-form';
import { DayPicker, DateRange } from 'react-day-picker';
// import 'react-day-picker/style.css';
import styles from './calendar.module.css';
import { FormValues } from '../../../types/form';

function Calendar() {
  const { control } = useFormContext<FormValues>();

  return (
    <div className={styles.calendarWrapper}>
      <Controller
        name="startDate"
        control={control}
        render={({ field: startField }) => (
          <Controller
            name="endDate"
            control={control}
            render={({ field: endField }) => {
              const range: DateRange | undefined = startField.value
                ? { from: startField.value, to: endField.value || undefined }
                : undefined;

              return (
                <DayPicker
                  mode="range"
                  selected={range}
                  onSelect={(r: DateRange | undefined) => {
                    startField.onChange(r?.from ?? null);
                    endField.onChange(r?.to ?? null);
                  }}
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
              );
            }}
          />
        )}
      />
    </div>
  );
}

export default Calendar;
