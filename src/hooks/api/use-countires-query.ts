import { useQuery } from '@tanstack/react-query';
import { Countries } from '../../types/api';
import { fetchCountries } from '../../api/actions';

export const useCountriesQuery = () => useQuery<Countries>({
  queryKey: ['countries'],
  queryFn: fetchCountries,
  staleTime: 1000 * 60 * 5, // кэш 5 минут
});
