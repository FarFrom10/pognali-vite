import { Controller, Control } from 'react-hook-form';
import styles from './counter.module.css';

type Props = {
  control: Control;
  name: string;
  label: string;
  unit: string;
  min: number;
  max: number;
};

function Counter({ control, name, label, unit, min, max}: Props) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const value = Number(field.value) || min;

        const increment = () => {
          if (value < max) {
            field.onChange(value + 1);
          }
        };
        const decrement = () => {
          if (value > min) {
            field.onChange(value - 1);
          }
        };

        return (
          <div className={styles.controls}>
            <span>{label}:</span>
            <div className={styles.buttonsContainer}>
              <button
                type="button"
                onClick={decrement}
              >
              –
              </button>
              <span>{value}</span>
              <button
                type="button"
                onClick={increment}
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
