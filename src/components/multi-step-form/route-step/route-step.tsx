import { Fragment, useMemo, useState, useEffect } from 'react';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import styles from './route-step.module.css';
import { FormValues } from '../../../types/form';
import { getFlagForCountry } from '../../../utils/country-flags';
import { CYRILLIC_ALPHABET } from '../../../const/const';

type Props = {
  countriesData: Record<string, string[]>;
};

export default function RouteStep({ countriesData }: Props) {
  const MAX_COUNTRIES = 4; // <-- ограничение

  const { control, watch } = useFormContext<FormValues>();
  const { fields, append, remove } = useFieldArray<FormValues>({
    control,
    name: 'countries',
  });

  // "countries" из формы — всегда актуальное состояние массива объектов { value: string }
  const countries = watch('countries');

  const allCountries = useMemo(
    () => Object.values(countriesData).flat(),
    [countriesData]
  );

  const [activeLetter, setActiveLetter] = useState<string>('А');

  /**
   * useEffect-страж:
   *  - если массив пуст — добавляем пустой селект
   *  - если нет пустого селекта (все заполнены) и длина < MAX — добавляем пустой
   * Это гарантирует, что всегда доступен пустой селект до достижения MAX.
   */
  useEffect(() => {
    const arr = countries ?? [];
    const total = arr.length;
    const hasEmpty = arr.some((it) => !(it?.value ?? '').trim());

    if (total === 0) {
      append({ value: '' });
      return;
    }

    if (!hasEmpty && total < MAX_COUNTRIES) {
      append({ value: '' });
    }
    // append из useFieldArray обычно стабилен — безопасно включать в зависимости
  }, [countries, append]);

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        {fields.map((f, idx) => (
          <div key={f.id} className={styles.controlRow}>
            <Controller
              control={control}
              name={`countries.${idx}.value`}
              render={({ field }) => (
                <Listbox
                  value={field.value ?? ''}
                  onChange={(v) => {
                    const selected = v?.trim();
                    const otherValues = countries?.map((c) => c.value).filter((_, i) => i !== idx) ?? [];

                    if (otherValues.includes(selected)) {
                      // страна уже выбрана в другом селекте → сбрасываем
                      field.onChange('');
                      return;
                    }

                    // сохраняем значение
                    field.onChange(selected);

                    // Если это последний селект и мы выбрали значение,
                    // — добавим новый пустой только если не достигли MAX.
                    if (idx === fields.length - 1 && (v ?? '') && fields.length < MAX_COUNTRIES) {
                      append({ value: '' });
                    }
                  }}
                >
                  <div className={styles.listboxWrap}>
                    <ListboxButton className={styles.trigger}>
                      <span className={field.value ? styles.selectedText : styles.placeholder}>
                        {field.value || 'Выберите страну'}
                      </span>
                      <span className={styles.chev}>▾</span>
                    </ListboxButton>

                    <ListboxOptions className={styles.options}>
                      <div className={styles.optionsHeader}>
                        <div className={styles.headerTitle}>ВЫБЕРИТЕ СТРАНУ</div>
                        <button
                          type="button"
                          className={styles.headerClose}
                          onClick={() => (document.activeElement as HTMLElement | null)?.blur()}
                        >
                          ×
                        </button>
                      </div>

                      <div className={styles.optionsBody}>
                        <div className={styles.letters}>
                          {CYRILLIC_ALPHABET.map((letter) => (
                            <button
                              key={letter}
                              type="button"
                              className={`${styles.letterBtn} ${activeLetter === letter ? styles.letterActive : ''}`}
                              onClick={() => setActiveLetter(letter)}
                            >
                              {letter}
                            </button>
                          ))}
                        </div>

                        <div className={styles.countryList}>
                          {allCountries
                            .filter((country) => (country || '').toUpperCase().startsWith(activeLetter))
                            .map((country) => (
                              <ListboxOption key={country} value={country} as={Fragment}>
                                {({ active, selected }) => (
                                  <div
                                    className={`${styles.countryRow} ${active ? styles.countryActive : ''} ${selected ? styles.countrySelected : ''}`}
                                  >
                                    <span>{country}</span>
                                  </div>
                                )}
                              </ListboxOption>
                            ))}
                        </div>
                      </div>
                    </ListboxOptions>
                  </div>
                </Listbox>
              )}
            />

            <button
              type="button"
              className={styles.removeBtn}
              onClick={() => {
                // просто удаляем — append будет выполнен в useEffect при необходимости
                remove(idx);
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className={styles.right}>
        <div className={styles.timeline}>
          {fields.map((f, idx) => {
            const currentValue = countries?.[idx]?.value ?? ''; // <-- из watch
            return (
              <div key={f.id} className={styles.timelineRow}>
                <div className={styles.dot} />
                {currentValue && (
                  <img
                    src={getFlagForCountry(currentValue)}
                    alt={`Флаг ${currentValue}`}
                    className={styles.flag}
                  />
                )}
                <button
                  type="button"
                  className={styles.removeIcon}
                  onClick={() => remove(idx)}
                  aria-label="Удалить страну"
                  disabled={!countries?.[idx]?.value} // нельзя удалить пустой селект
                >
          ×
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
