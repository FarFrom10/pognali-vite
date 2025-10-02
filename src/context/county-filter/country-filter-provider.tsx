import { useState, ReactNode } from 'react';
import { CountryFilterContext } from './country-filter-context';

export const CountryFilterProvider = ({ children }: { children: ReactNode }) => {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setActiveCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleCountry = (country: string) => {
    setSelectedCountries((prev) =>
      prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country]
    );
  };

  return (
    <CountryFilterContext.Provider
      value={{
        activeCategories,
        toggleCategory,
        selectedCountries,
        toggleCountry,
      }}
    >
      {children}
    </CountryFilterContext.Provider>
  );
};
