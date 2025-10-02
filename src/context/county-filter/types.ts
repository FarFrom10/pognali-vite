export type CountryFilterContextType = {
  activeCategories: string[];
  toggleCategory: (category: string) => void;
  selectedCountries: string[];
  toggleCountry: (country: string) => void;
};
