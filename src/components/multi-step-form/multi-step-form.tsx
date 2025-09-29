import { FormProvider, useForm } from 'react-hook-form';
import { useStep } from 'usehooks-ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormStepName } from '../../const/enum';
import styles from './multi-step-form.module.css';
import { formStepText } from '../../const/const';
import DatesStep from './dates-step/dates-step';
import RouteStep from './route-step/route-step';
import { useCountriesQuery } from '../../hooks/api/use-countires-query';
import EntertainmentStep from './entertainment-step/entertainment-step';
import { FormValues, schema } from '../../schemas/form-schema';


function MultiStepForm() {
  const steps = Object.values(FormStepName);
  const { data: countries } = useCountriesQuery();

  const methods = useForm<FormValues>({
    defaultValues: {
      peopleAmount: 1,
      duration: 2,
      isChildrenAllowed: false,
      dateRange: { from: null, to: null },
      countries: [],
      comments: {},
    },
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const [step, {
    goToNextStep,
    goToPrevStep,
    reset: resetStep,
    canGoToPrevStep,
  }] = useStep(steps.length);

  // const stepFields: Record<number, (keyof FormValues)[]> = {
  //   1: ['dateRange', 'peopleAmount', 'duration', 'isChildrenAllowed'],
  //   2: ['countries'],
  //   3: ['comments'],
  // };

  const onNextStep = async () => {
    if (step < steps.length) {
    // До последнего шага — просто переключаемся
      goToNextStep();
    } else {
    // На последнем шаге — валидируем всю форму
      const isValid = await methods.trigger();

      if (!isValid) {
        return; // остаёмся на шаге, если есть ошибки
      }

      console.log('Форма полностью заполнена:', methods.getValues());
      methods.reset();
      resetStep();
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className={styles.form}
      >
        <div className={styles.formHeader}>
          <div className={styles.titles}>
            <h3 className={styles.title}>Шаг {step}.{steps[step - 1]}</h3>
            <p>{formStepText[steps[step]]}</p>
          </div>
          <ul className={styles.stepsList}>
            {steps.map((item, index) => (
              <li
                key={item}
                className={`${styles.stepItem} ${index + 1 === step ? styles.activeStep : ''}`}
              >
                {item.split(' ')[0]}
              </li>
            ))}
          </ul>
        </div>

        {step === 1 && <DatesStep />}
        {step === 2 && countries?.locations && <RouteStep countriesData={countries?.locations} />}
        {step === 3 && <EntertainmentStep />}

        <div className={styles.btnContainer}>
          <button
            type="button"
            className={styles.btn}
            onClick={() => void onNextStep()}
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
