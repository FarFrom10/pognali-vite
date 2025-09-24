import { FormProvider, useForm } from 'react-hook-form';
import { useStep } from 'usehooks-ts';
import DatesStep from './dates-step/dates-step';
import { FormStepName } from '../../const/enum';
import styles from './multi-step-form.module.css';
import { formStepText } from '../../const/const';

function MultiStepForm() {
  type FormValues = {
    name: string;
    email: string;
    address: string;
    cardNumber: string;
  }

  const steps = Object.values(FormStepName);

  const methods = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      address: '',
      cardNumber: '',
    },
    mode: 'onChange',
  });

  const [step, {
    goToNextStep,
    goToPrevStep,
    reset: resetStep,
    canGoToPrevStep,
  }] = useStep(steps.length);

  const onSubmit = methods.handleSubmit((data) => {
    if (step < steps.length) {
      goToNextStep();
    } else {
      // alert(`Форма отправлена: ${ JSON.stringify(data, null, 2)}`);
      methods.reset();
      resetStep();
    }
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(e) => void onSubmit(e)}
        className={styles.form}
      >
        <div className={styles.formHeader}>
          <div className={styles.titles}>
            <h3 className={styles.title}>Шаг {step}.{steps[step - 1]}</h3>
            <p>{formStepText[steps[step]]}</p>
          </div>
          <ul className={styles.stepsList}>
            {
              steps.map((item, index) => (
                <li
                  key={item}
                  className={`${styles.stepItem} ${index + 1 === step ? styles.activeStep : ''}`}
                >
                  {item.split(' ')[0]}
                </li>
              ))
            }
          </ul>
        </div>

        {step === 0 && <DatesStep />}
        {/* {step === 1 && <AddressStep />}
        {step === 2 && <ConfirmationStep data={methods.getValues()} />} */}

        <div className={styles.btnContainer}>
          <button
            type="submit"
            className={styles.btn}
          >
            {step === steps.length ? 'Отправить' : 'Следующий шаг'}
          </button>

          {canGoToPrevStep && (
            <button
              type="button"
              onClick={goToPrevStep}
              className={styles.btn}
            >
            На шаг назад
            </button>
          )}

        </div>
      </form>
    </FormProvider>
  );
}

export default MultiStepForm;
