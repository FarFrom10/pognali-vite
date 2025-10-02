import { createContext } from 'react';
import { CountryFilterContextType } from './types';

export const CountryFilterContext = createContext<CountryFilterContextType | undefined>(undefined);
