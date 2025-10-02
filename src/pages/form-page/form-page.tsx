import { FormProvider, useForm } from 'react-hook-form';
import Container from '../../components/container/container';
import Header from '../../components/header/header';
import MultiStepForm from '../../components/multi-step-form/multi-step-form';
import PageHero from '../../components/page-hero/page-hero';
import styles from './form-page.module.scss';
import { FormValues, mainFormSchema } from '../../schemas/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Footer from '../../components/footer/footer';

function FormPage() {
  const methods = useForm<FormValues>({
    defaultValues: {
      tags: [],
      transport: [],
      peopleAmount: 1,
      duration: 2,
      isChildrenAllowed: false,
      dateRange: { from: null, to: null },
      countries: [],
      comments: {},
    },
    mode: 'onChange',
    resolver: zodResolver(mainFormSchema),
  });

  return (
    <FormProvider {...methods}>
      <div className={styles.formPage}>
        <Header />
        <PageHero title="Направления" isFormPage/>

        <div className={styles.wrapper}>
          <main className={styles.main}>
            <Container>
              <h2 className={styles.mainTitle}>Добавить план:</h2>
              <MultiStepForm/>
            </Container>
          </main>
          <Footer/>
        </div>

      </div>
    </FormProvider>
  );
}

export default FormPage;
