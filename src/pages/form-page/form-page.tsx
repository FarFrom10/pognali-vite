import Container from '../../components/container/container';
import MultiStepForm from '../../components/multi-step-form/multi-step-form';
import PageHero from '../../components/page-hero/page-hero';
import styles from './form-page.module.css';

function FormPage() {
  return (
    <div className={styles.formWrapper}>
      <PageHero title="Направления" />
      <main>
        <Container>
          <h2 className={styles.title}>Добавить план:</h2>
          <MultiStepForm/>
        </Container>
      </main>
    </div>
  );
}

export default FormPage;
