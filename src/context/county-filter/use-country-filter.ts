import { useContext } from 'react';
import { CountryFilterContextType } from './types';
import { CountryFilterContext } from './country-filter-context';

export const useCountryFilter = (): CountryFilterContextType => {
  const context = useContext(CountryFilterContext);
  if (!context) {
    throw new Error('useCountryFilter must be used within a CountryFilterProvider');
  }
  return context;
};
