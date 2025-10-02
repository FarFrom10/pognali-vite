
import styles from './page-hero.module.scss';
import Container from '../container/container';
import ContentHero from './content-hero/content-hero';

type Props = {
  title?: string;
  isFormPage?: boolean;
}

function PageHero({ title = 'Направления', isFormPage = false }: Props) {

  return (
    (
      <section className={styles.pageHero}>
        {/* Заголовок с фоном */}
        <div className={styles.headerBlock}>
          <Container>
            <h1 className={styles.title}>{title}</h1>
          </Container>
        </div>

        {isFormPage && <ContentHero/>}
      </section>
    )
  );
}

export default PageHero;
