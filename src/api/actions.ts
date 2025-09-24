import { Countries } from '../types/api';
import { apiClient } from './api-client';

export const fetchCountries = async (): Promise<Countries> => {
  const { data } = await apiClient.get<Countries>('/api/countries');
  return data;
};
