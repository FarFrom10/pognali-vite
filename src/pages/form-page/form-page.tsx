import Container from '../../components/container/container';
import Header from '../../components/header/header';
import MultiStepForm from '../../components/multi-step-form/multi-step-form';
import PageHero from '../../components/page-hero/page-hero';
import styles from './form-page.module.scss';

function FormPage() {
  return (
    <div className={styles.formPage}>
      <Header />
      <PageHero title="Направления" />

      <main className={styles.main}>
        <Container>
          <h2 className={styles.mainTitle}>Добавить план:</h2>
          <MultiStepForm/>
        </Container>
      </main>
    </div>
  );
}

export default FormPage;
