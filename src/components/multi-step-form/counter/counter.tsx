import { Controller, Control, FieldValues, FieldPath } from 'react-hook-form';
import styles from './counter.module.css';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  unit: string;
  min: number;
  max: number;
  onManualChange?: (newValue: number) => void;
  disabled?: boolean;
};

function Counter<T extends FieldValues>({
  control,
  name,
  label,
  unit,
  min,
  max,
  onManualChange,
  disabled = false,
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const value = Number(field.value) || min;

        const increment = () => {
          if (disabled) {
            return;
          } // 🔒 запрет действий
          if (value < max) {
            const newValue = value + 1;
            if (onManualChange) {
              onManualChange(newValue);
            } else {
              field.onChange(newValue);
            }
          }
        };

        const decrement = () => {
          if (disabled) {
            return;
          } // 🔒 запрет действий
          if (value > min) {
            const newValue = value - 1;
            if (onManualChange) {
              onManualChange(newValue);
            } else {
              field.onChange(newValue);
            }
          }
        };

        return (
          <div
            className={`${styles.wrapper} ${
              disabled ? styles.disabled : ''
            }`}
          >
            <span>{label}:</span>
            <div className={styles.buttonsContainer}>
              <button
                type="button"
                onClick={decrement}
                disabled={disabled}
              >
                –
              </button>
              <span>{value}</span>
              <button
                type="button"
                onClick={increment}
                disabled={disabled}
              >
                +
              </button>
            </div>
            <span>{unit}.</span>
          </div>
        );
      }}
    />
  );
}

export default Counter;
