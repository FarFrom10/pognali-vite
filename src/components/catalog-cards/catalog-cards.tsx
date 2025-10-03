import { CompanionPagination } from '../../schemas/companion-pagination.schema';
import CommonIcon from '../common-icon/common-icon';
import Card from './card/card';
import styles from './catalog-cards.module.scss';

type Props = {
  companionsData: CompanionPagination;
  onShowMore: () => void;
  isButtonVisible: boolean;
}

function CatalogCards({ companionsData, onShowMore, isButtonVisible }: Props) {

  const cardsList = companionsData.entities
    .map((companion) => <Card key={companion.id} companion={companion}/>);

  return (
    <div className={styles.cardsWrapper}>
      {cardsList}

      {
        isButtonVisible && (
          <button
            type='button'
            className={styles.showMoreBtn}
            onClick={onShowMore}
          >
            <CommonIcon name='plusMore' width={26} height={26}/>
        показать еще
          </button>
        )
      }
    </div>
  );
}

export default CatalogCards;
