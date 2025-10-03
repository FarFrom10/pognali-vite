import { useFormContext } from 'react-hook-form';
import { useStep } from 'usehooks-ts';
import { AppRoute, FormStepName } from '../../const/enum';
import styles from './multi-step-form.module.scss';
import { formStepText } from '../../const/const';
import DatesStep from './dates-step/dates-step';
import RouteStep from './route-step/route-step';
import { useCountriesQuery } from '../../hooks/api/use-countires-query';
import EntertainmentStep from './entertainment-step/entertainment-step';
import { FormValues } from '../../schemas/form-schema';
import { useNavigate } from 'react-router-dom';


function MultiStepForm() {
  const navigate = useNavigate();

  const steps = Object.values(FormStepName);
  const { data: countries } = useCountriesQuery();
  const { trigger, reset, formState, setError } = useFormContext<FormValues>();

  const [step, {
    goToNextStep,
    goToPrevStep,
    reset: resetStep,
    canGoToPrevStep,
  }] = useStep(steps.length);

  const onNextStep = async () => {
    if (step < steps.length) {
    // До последнего шага — просто переключаемся
      goToNextStep();
    } else {
    // На последнем шаге — валидируем всю форму
      const isValid = await trigger();

      if (!isValid) {
        setError('root', { type: 'manual', message: 'Заполните все поля формы' });
        return; // остаёмся на последнем шаге, если есть ошибки
      }

      reset();
      resetStep();
      navigate(AppRoute.Catalog);
    }
  };

  return (
    <form
      className={styles.form}
    >
      <div className={styles.formHeader}>
        <div className={styles.titles}>
          <h3 className={styles.title}>Шаг {step}.{steps[step - 1]}</h3>
          <p>{formStepText[steps[step - 1]]}</p>
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

      <div className={styles.stepsWrapper}>
        {step === 1 && <DatesStep />}
        {step === 2 && countries?.locations && <RouteStep countriesData={countries?.locations} />}
        {step === 3 && <EntertainmentStep />}
      </div>

      <div className={styles.btnContainer}>
        <div className={styles.btnNextWrapper}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnNext}`}
            onClick={() => void onNextStep()}
          >
            {step === steps.length ? 'Отправить' : 'Следующий шаг'}
          </button>

          {formState.errors.root && step === 3 && (
            <span className={styles.errorMessage}>
              {formState.errors.root.message}
            </span>
          )}
        </div>

        {canGoToPrevStep && (
          <button
            type="button"
            onClick={goToPrevStep}
            className={`${styles.btn} ${styles.btnPrev}`}
          >
              На шаг назад
          </button>
        )}
      </div>
    </form>
  );
}

export default MultiStepForm;
