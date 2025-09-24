import { useCountriesQuery } from '../../hooks/api/use-countires-query';

function FormPage() {
  const { data, isLoading, isError } = useCountriesQuery();

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
