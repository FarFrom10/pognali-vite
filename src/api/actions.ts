import { CompanionsFilter, Countries } from '../types/api';
import { apiClient } from './api-client';
import { CompanionPagination } from '../schemas/companion-pagination.schema';

export const fetchCountries = async (): Promise<Countries> => {
  const { data } = await apiClient.get<Countries>('/api/countries');
  return data;
};

export const fetchFilteredCompanions = async (
  filters?: CompanionsFilter
): Promise<CompanionPagination> => {
  const params = new URLSearchParams();

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          params.append(key, value.join(','));
        } else {
          params.append(key, String(value));
        }
      }
    });
  }

  const { data } = await apiClient.get<CompanionPagination>(
    `/api/companions?${params.toString()}`
  );

  return data;
};
