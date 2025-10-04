import { useState, useEffect, useRef } from 'react';
import { useDebounceValue } from 'usehooks-ts';
import styles from './range-filter.module.scss';

interface Props {
  min: number;
  max: number;
  value: [number, number];
  onChange: (val: [number, number]) => void;
}

export default function RangeFilter({ min, max, value, onChange }: Props) {
  const [local, setLocal] = useState<[number, number]>(value);
  const [debounced] = useDebounceValue(local, 150);
  const rangeRef = useRef<HTMLDivElement>(null);

  // дебаунс обновления наружу
  useEffect(() => {
    if (debounced[0] !== value[0] || debounced[1] !== value[1]) {
      onChange(debounced);
    }
  }, [debounced, onChange, value]);

  // ограничение, чтобы ползунки не пересекались
  const handleChange = (index: 0 | 1, val: number) => {
    let [left, right] = local;

    if (index === 0) {
      left = Math.min(Math.max(val, min), right - 6);
    } else {
      right = Math.max(Math.min(val, max), left + 6);
    }

    setLocal([left, right]);
  };

  // визуальная заливка трека
  useEffect(() => {
    const getPercent = (val: number) => ((val - min) / (max - min)) * 100;

    if (rangeRef.current) {
      const leftPercent = getPercent(local[0]);
      const rightPercent = getPercent(local[1]);
      rangeRef.current.style.left = `${leftPercent}%`;
      rangeRef.current.style.width = `${rightPercent - leftPercent}%`;
    }
  }, [local, min, max]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputBox}>
        <input
          type="number"
          name='min'
          value={local[0]}
          min={min}
          max={local[1] - 1}
          onChange={(e) => handleChange(0, Number(e.target.value))}
        />
        <span className={styles.divider}>
          <span></span>
        </span>
        <input
          type="number"
          name='max'
          value={local[1]}
          min={local[0] + 1}
          max={max}
          onChange={(e) => handleChange(1, Number(e.target.value))}
        />
      </div>

      <div className={styles.sliderBox}>
        <div className={styles.track}></div>
        <div ref={rangeRef} className={styles.range}></div>

        <input
          type="range"
          min={min}
          max={max}
          step={1}
          value={local[0]}
          onChange={(e) => handleChange(0, Number(e.target.value))}
          className={styles.thumb}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={1}
          value={local[1]}
          onChange={(e) => handleChange(1, Number(e.target.value))}
          className={styles.thumb}
        />
      </div>
    </div>
  );
}
