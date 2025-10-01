import { Fragment, useMemo, useState, useEffect, useRef } from 'react';
import { Listbox } from '@headlessui/react';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import styles from './route-step.module.css';
import { getFlagForCountry } from '../../../utils/country-flags';
import { CYRILLIC_ALPHABET } from '../../../const/const';
import { FormValues } from '../../../schemas/form-schema';
import CommonIcon from '../../common-icon/common-icon';

type Props = {
  countriesData: Record<string, string[]>;
};

export default function RouteStep({ countriesData }: Props) {
  const MAX_COUNTRIES = 4;
  const isFirstRender = useRef(true);

  const { control, watch } = useFormContext<FormValues>();
  const { fields, append, remove } = useFieldArray<FormValues>({
    control,
    name: 'countries',
  });

  const countries = watch('countries');

  const allCountries = useMemo(
    () => Object.values(countriesData).flat(),
    [countriesData]
  );

  const [activeLetter, setActiveLetter] = useState<string>('А');

  useEffect(() => {
    if (isFirstRender.current && countries.length === 0) {
      append({ value: '' });
      isFirstRender.current = false;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRemoveCountry = (idx: number) => {
    remove(idx);
    const isHaveEmptySelect = countries.some((item) => item.value === '');
    if (countries.length === MAX_COUNTRIES && !isHaveEmptySelect) {
      append({ value: '' });
    }
  };

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
                    const otherValues = countries
                      ?.map((c) => c.value)
                      .filter((_, i) => i !== idx) ?? [];

                    if (otherValues.includes(selected)) {
                      field.onChange('');
                      return;
                    }

                    field.onChange(selected);

                    if (
                      idx === fields.length - 1 &&
                      (v ?? '') &&
                      fields.length < MAX_COUNTRIES
                    ) {
                      append({ value: '' });
                    }
                  }}
                >
                  {({ open }) => (
                    <div className={styles.listboxWrap}>
                      <Listbox.Button className={`${styles.trigger} ${open ? styles.triggerActive : ''}`}>
                        <span
                          className={styles.selectedText}
                        >
                          {field.value || 'Выберите страну'}
                        </span>
                        <span className={styles.chev}>
                          <CommonIcon name={open ? 'closeSelect' : 'arrowDown'} />
                        </span>
                      </Listbox.Button>

                      <Listbox.Options className={styles.options}>
                        <div className={styles.optionsHeader}>
                          <div className={styles.headerTitle}>ВЫБЕРИТЕ СТРАНУ</div>
                          <button
                            type="button"
                            className={styles.headerClose}
                            onClick={() =>
                              (document.activeElement as HTMLElement | null)?.blur()}
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
                                className={`${styles.letterBtn} ${
                                  activeLetter === letter ? styles.letterActive : ''
                                }`}
                                onClick={() => setActiveLetter(letter)}
                              >
                                {letter}
                              </button>
                            ))}
                          </div>

                          <div className={styles.countryList}>
                            {allCountries
                              .filter((country) =>
                                (country || '').toUpperCase().startsWith(activeLetter)
                              )
                              .map((country) => (
                                <Listbox.Option key={country} value={country} as={Fragment}>
                                  {({ active, selected }) => (
                                    <div
                                      className={`${styles.countryRow} ${
                                        active ? styles.countryActive : ''
                                      } ${selected ? styles.countrySelected : ''}`}
                                    >
                                      <span>{country}</span>
                                    </div>
                                  )}
                                </Listbox.Option>
                              ))}
                          </div>
                        </div>
                      </Listbox.Options>
                    </div>
                  )}
                </Listbox>
              )}
            />
          </div>
        ))}
      </div>

      <div className={styles.right}>
        <div className={styles.timeline}>
          {fields.map((f, idx) => {
            const currentValue = countries?.[idx]?.value ?? '';
            return (
              <div key={f.id} className={styles.timelineRow}>
                <div className={`${styles.dot} ${currentValue ? styles.activeDot : ''}`} />
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
                  onClick={() => onRemoveCountry(idx)}
                  aria-label="Удалить страну"
                  disabled={!countries?.[idx]?.value}
                >
                  <CommonIcon name="close" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
