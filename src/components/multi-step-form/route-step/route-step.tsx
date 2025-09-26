import { Fragment, useMemo, useState, useEffect } from 'react';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import styles from './route-step.module.css';
import { FormValues } from '../../../types/form';

type Props = {
  countriesData: Record<string, string[]>;
}

const CYRILLIC_ALPHABET = [
  'А','Б','В','Г','Д','Е','Ж','З','И','К','Л',
  'М','Н','О','П','Р','С','Т','У','Ф','Х',
  'Ч','Ш','Э','Ю','Я'
];

export default function RouteStep({ countriesData }: Props) {
  const { control, setValue } = useFormContext<FormValues>();
  const { fields, append, remove, replace } = useFieldArray<FormValues, 'countries'>({
    control,
    name: 'countries',
  });

  // соберём все страны в один список (flat)
  const allCountries = useMemo(
    () => Object.values(countriesData).flat(),
    [countriesData]
  );

  // активная буква для фильтра
  const [activeLetter, setActiveLetter] = useState<string>('А');

  // при первом рендере, если нет полей — добавим один пустой
  useEffect(() => {
    if (fields.length === 0) {
      append('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // helper для получения флага — тут заглушка, можно заменить на реальную логику
  const flagFor = (countryName: string) => '/images/flags/flag-example.png';

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        {fields.map((f, idx) => (
          <div key={f.id} className={styles.controlRow}>
            <Controller
              control={control}
              name={`countries.${idx}`}
              render={({ field }) => (
                <Listbox value={field.value ?? ''} onChange={(v) => field.onChange(v)}>
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
                        {/* Закрытие опций через нативное поведение Listbox (X можно просто стилизовать) */}
                        <button
                          type="button"
                          className={styles.headerClose}
                          onClick={() => {
                            /* фокус на кнопку кнопки закроет список автоматически */
                            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                            (document.activeElement as HTMLElement | null)?.blur();
                          }}
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
                            .filter((c) => (c || '').toUpperCase().startsWith(activeLetter))
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
                remove(idx);
                // если удалили последний элемент и массив пуст → добавим пустой селект
                setTimeout(() => {
                  // прочитать текущее значение поля
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const cur = (control as any)._formValues?.countries ?? [];
                  if (!cur || cur.length === 0) {
                    append('');
                  }
                }, 0);
              }}
            >
              ×
            </button>
          </div>
        ))}

        <div className={styles.addRow}>
          <button
            type="button"
            className={styles.addBtn}
            onClick={() => append('')}
          >
            + Добавить страну
          </button>
        </div>
      </div>

      <div className={styles.right}>
        {/* Вертикальная линия + строки с флагом и крестиком, порядок соответствует fields */}
        <div className={styles.timeline}>
          {fields.map((f, idx) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const value = (control as any)._formValues?.countries?.[idx] as string | undefined;
            return (
              <div key={f.id} className={styles.timelineRow}>
                <div className={styles.dot} />
                <img src={value ? flagFor(value) : '/images/flags/flag-example.png'} alt="flag" className={styles.flag} />
                <button
                  type="button"
                  className={styles.removeIcon}
                  onClick={() => remove(idx)}
                  aria-label="Удалить страну"
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
