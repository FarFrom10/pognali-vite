import { FormProvider, useForm } from 'react-hook-form';
import { useStep } from 'usehooks-ts';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormStepName } from '../../const/enum';
import styles from './multi-step-form.module.css';
import { formStepText } from '../../const/const';
import { FormValues } from '../../types/form';
import DatesStep from './dates-step/dates-step';

const schema = yup.object({
  peopleAmount: yup
    .number()
    .typeError('Укажите количество попутчиков')
    .min(1, 'Минимум 1 человек')
    .max(10, 'Максимум 10 человек')
    .required('Это обязательное поле'),

  duration: yup
    .number()
    .typeError('Укажите длительность поездки')
    .min(2, 'Минимум 2 дня')
    .max(31, 'Максимум 31 день')
    .required('Это обязательное поле'),

  isChildrenAllowed: yup
    .boolean()
    .required('Это обязательное поле'),

  dateRange: yup.object({
    from: yup.date().nullable(),
    to: yup.date().nullable(),
  }).required('Выберите диапазон дат'),
});


function MultiStepForm() {
  const steps = Object.values(FormStepName);

  const methods = useForm<FormValues>({
    defaultValues: {
      peopleAmount: 1,
      duration: 2,
      isChildrenAllowed: false,
      dateRange: { from: null, to: null },
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const [step, {
    goToNextStep,
    goToPrevStep,
    reset: resetStep,
    canGoToPrevStep,
  }] = useStep(steps.length);

  const onSubmit = methods.handleSubmit((data) => {
    if (step < steps.length) {
      console.log(data);
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

        {step === 1 && <DatesStep />}
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
