import { useCompanionsQuery } from '../../hooks/api/use-companions-query';
import { useCountriesQuery } from '../../hooks/api/use-countires-query';

function FormPage() {
  //Код для теста api-запросов
  const { data, isLoading, isError } = useCountriesQuery();
  const { data: compsData, isLoading: isCompsLoading, isError: isCompsError } = useCompanionsQuery();
  console.log(compsData);
  if (isLoading) {
    return <p>Загрузка...</p>;
  }
  if (isError) {
    return <p>Ошибка!</p>;
  }

  console.log(data);

  return (
    <div>
      {data && Object.entries(data.flags).map(([country, flag]) => (
        <li key={country}>
          {flag} {country}
        </li>
      ))}
    </div>
  );
}

export default FormPage;
