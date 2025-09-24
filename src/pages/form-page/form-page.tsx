import MultiStepForm from '../../components/multi-step-form/multi-step-form';
import styles from './form-page.module.css';

function FormPage() {
  return (
    <div className="container">
      <main>
        <div className={styles.fromWrapper}>
          <h2 className={styles.title}>Добавить план:</h2>
          <MultiStepForm/>
        </div>
      </main>
    </div>
  );
}

export default FormPage;
