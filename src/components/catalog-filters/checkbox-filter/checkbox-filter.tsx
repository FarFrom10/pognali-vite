import styles from './checkbox-filter.module.scss';

interface Props<T> {
  options: T;
  value: (keyof T)[];
  onChange: (newValue: (keyof T)[]) => void;
}

export function CheckboxFilter<T extends Record<string, string>>({
  options,
  value,
  onChange,
}: Props<T>) {
  const handleToggle = (key: keyof T) => {
    if (value.includes(key)) {
      onChange(value.filter((v) => v !== key));
    } else {
      onChange([...value, key]);
    }
  };

  return (
    <div className={styles.wrapper}>
      {Object.entries(options).map(([key, label]) => (
        <label key={key} className={styles.option}>
          <input
            type="checkbox"
            checked={value.includes(key as keyof T)}
            onChange={() => handleToggle(key as keyof T)}
            className={styles.hiddenCheckbox}
          />
          <span className={styles.customCheckbox} />
          <span className={styles.checkboxText}>{label}</span>
        </label>
      ))}
    </div>
  );
}
