// MainFilters.tsx
import { useState } from 'react';
import { HobbyType } from '../../types/hobby-type.enum';
import { MusicType } from '../../types/music-type.enum';
import { FoodType } from '../../types/food-type.enum';
import styles from './catalog-filters.module.scss';
import FilterShell from './filter-shell/filter-shell';
import { CheckboxFilter } from './checkbox-filter/checkbox-filter';
import RangeFilter from './range-filter/range-filter';
import TransportIcons from '../ui/transport-icons/transport-icons';
import { TransportType } from '../../types/transport-type.enum';

function CatalogFilters() {
  const [hobby, setHobby] = useState<(keyof typeof HobbyType)[]>([]);
  const [music, setMusic] = useState<(keyof typeof MusicType)[]>([]);
  const [food, setFood] = useState<(keyof typeof FoodType)[]>([]);
  const [transport, setTransport] = useState<(keyof typeof TransportType)[]>([]);
  const [level, setLevel] = useState<[number, number]>([30, 100]);
  console.log(transport);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Подберите идеального попутчика</h3>
      <div className={styles.filters}>
        <FilterShell title="Хобби">
          <CheckboxFilter options={HobbyType} value={hobby} onChange={setHobby} />
        </FilterShell>

        <FilterShell title="Музыка">
          <CheckboxFilter options={MusicType} value={music} onChange={setMusic} />
        </FilterShell>

        <FilterShell title="Еда">
          <CheckboxFilter options={FoodType} value={food} onChange={setFood} />
        </FilterShell>

        <FilterShell title="Транспорт">
          <TransportIcons
            value={transport}
            onChange={setTransport}
            withHover={false}
            className={styles.transport}
            label=''
          />
        </FilterShell>

        <FilterShell title="Левел">
          <RangeFilter min={0} max={100} value={level} onChange={setLevel} />
        </FilterShell>
      </div>

      <button className={styles.submit}>Показать</button>
    </div>
  );
}

export default CatalogFilters;
