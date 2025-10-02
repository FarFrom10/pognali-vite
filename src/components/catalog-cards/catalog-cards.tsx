import { CompanionPagination } from '../../schemas/companion-pagination.schema';
import Card from './card/card';
import styles from './catalog-cards.module.scss';

type Props = {
  companionsData: CompanionPagination;
}

function CatalogCards({ companionsData }: Props) {

  const cardsList = companionsData.entities
    .map((companion) => <Card key={companion.id} companion={companion}/>);

  return (
    <div className={styles.cardsWrapper}>
      {cardsList}
    </div>
  );
}

export default CatalogCards;
