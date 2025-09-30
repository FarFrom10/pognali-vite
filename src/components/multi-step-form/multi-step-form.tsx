import { useFormContext } from 'react-hook-form';
import { useStep } from 'usehooks-ts';
import { FormStepName } from '../../const/enum';
import styles from './multi-step-form.module.css';
import { formStepText } from '../../const/const';
import DatesStep from './dates-step/dates-step';
import RouteStep from './route-step/route-step';
import { useCountriesQuery } from '../../hooks/api/use-countires-query';
import EntertainmentStep from './entertainment-step/entertainment-step';
import { FormValues } from '../../schemas/form-schema';


function MultiStepForm() {
  const steps = Object.values(FormStepName);
  const { data: countries } = useCountriesQuery();
  const { trigger, getValues, reset } = useFormContext<FormValues>();

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
      console.log(getValues());
    } else {
    // На последнем шаге — валидируем всю форму
      const isValid = await trigger();

      if (!isValid) {
        return; // остаёмся на шаге, если есть ошибки
      }

      console.log('Форма полностью заполнена:', getValues());
      reset();
      resetStep();
    }
  };

  return (
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
  );
}

export default MultiStepForm;
